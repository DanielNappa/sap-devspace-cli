import * as fs from 'fs';
const xml2js = require('xml2js');

export async function getCDSFromOData(xmlFile: string, force?:boolean) : Promise<string>{
    const csvFile = xmlFile.replace('.xml', '.cds');
    if (force || !fs.existsSync(csvFile)) {
        await genCDSFromOData(xmlFile, csvFile);
    }
    return fs.readFileSync(csvFile, 'utf8');
}

export async function getEntitySetsFromOData(xmlFile: string): Promise<string[]> {
    return new Promise(async (resolve, reject) => {
        if (!fs.existsSync(xmlFile)) {
            reject(`File ${xmlFile} not found`);
        }

        fs.readFile(xmlFile, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }

            xml2js.parseString(data, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }

                if (result['edmx:Edmx']['edmx:DataServices']) {
                    const entitySets = result['edmx:Edmx']['edmx:DataServices'][0].Schema[0].EntityContainer[0].EntitySet;
                    const simSets = entitySets.map((_set: any) => {
                        return _set.$.Name;
                    });
                    resolve(simSets);
                } else {
                    reject('OData not supported yet');
                }

            });
        });
    });
}

export async function getEntitySetsFromODataString(data: string): Promise<string[]> {
    return new Promise(async (resolve, reject) => {
        xml2js.parseString(data, (err: any, result: any) => {
            if (err) {
                reject(err);
            }

            if (result['edmx:Edmx']['edmx:DataServices']) {
                const entitySets = result['edmx:Edmx']['edmx:DataServices'][0].Schema[0].EntityContainer[0].EntitySet;
                const simSets = entitySets.map((_set: any) => {
                    return _set.$.Name;
                });
                resolve(simSets);
            } else {
                reject('OData not supported yet');
            }
        });
    });
}

export async function getXmlEntityFromSet(xmlFile: string, entitySetName: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        if (!fs.existsSync(xmlFile)) {
            reject(`File ${xmlFile} not found`);
        }

        fs.readFile(xmlFile, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }

            xml2js.parseString(data, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }

                let entityTypes, entitySets;
                let schemaName: string = '';
                let alias: string = '';

                if (result['edmx:Edmx']['edmx:DataServices']) {
                    schemaName = result['edmx:Edmx']['edmx:DataServices'][0].Schema[0].$.Namespace;
                    alias = result['edmx:Edmx']['edmx:DataServices'][0].Schema[0].$.Alias;
                    entityTypes = result['edmx:Edmx']['edmx:DataServices'][0].Schema[0].EntityType;
                    entitySets = result['edmx:Edmx']['edmx:DataServices'][0].Schema[0].EntityContainer[0].EntitySet;
                } else {
                    reject('OData not supported yet');
                }

                const targetSet = entitySets.find((_set: any) => {
                    return _set.$.Name === entitySetName;
                });

                if (!targetSet) {
                    reject(`Entity set ${entitySetName} not found`);
                };


                const targetTypeName = targetSet.$.EntityType;
                let targetType;
                if (alias) {
                    targetType = entityTypes.find((_type: any) => {
                        return `${alias}.${_type.$.Name}` === targetTypeName;
                    });
                }
                if (schemaName) {
                    targetType = entityTypes.find((_type: any) => {
                        return `${schemaName}.${_type.$.Name}` === targetTypeName;
                    });
                }

                if (!targetType) {
                    reject(`Target type ${targetTypeName} not found`);
                };

                const formattedType = Object.assign({}, targetType);
                formattedType.$.Name = entitySetName;

                const builder = new xml2js.Builder();
                const formattedNode = builder.buildObject(formattedType);

                resolve(formattedNode);
            });
        });
    });
}

async function genCDSFromOData(xmlFile: string, csvFile?: string) {

    if (!csvFile) {
        csvFile = xmlFile.replace('.xml', '.cds');
    }

    const entities: any[] = [];
    return new Promise(async (resolve, reject) => {
        if (!fs.existsSync(xmlFile)) {
            reject(`File ${xmlFile} not found`);
        }

        fs.readFile(xmlFile, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            xml2js.parseString(data, (err: any, result: any) => {
                if (err) {
                    reject(err);
                }

                let entitySets, entityTypes;
                let schema: any, schemaName: string;

                if (result['edmx:Edmx']['edmx:DataServices']) {
                    schema = result['edmx:Edmx']['edmx:DataServices'][0].Schema[0];
                    schemaName = result['edmx:Edmx']['edmx:DataServices'][0].Schema[0].$.Namespace;
                    entitySets = result['edmx:Edmx']['edmx:DataServices'][0].Schema[0].EntityContainer[0].EntitySet;
                    entityTypes = result['edmx:Edmx']['edmx:DataServices'][0].Schema[0].EntityType;
                } else {
                    reject('OData not supported yet');
                }

                // Get entity sets, types, and properties
                for (const entitySet of entitySets) {
                    const entityTypeName = entitySet.$.EntityType;
                    let properties, navigationProperties, keys: any[] ;

                    // Get properties
                    if (result['edmx:Edmx']['edmx:DataServices']) {
                        // OData 2.0
                        const targetType = entityTypes.find((_type: any) => {
                            return `${schemaName}.${_type.$.Name}` === entityTypeName;
                        });
                        properties = targetType.Property ? targetType.Property : [];
                        keys = (targetType.Key && targetType.Key.length> 0) ? targetType.Key[0].PropertyRef : [];
                        navigationProperties = targetType.NavigationProperty ? targetType.NavigationProperty : [];;
                    } else if (result.edmx.EntityContainer) {
                        // OData 4.0
                        properties.push(...result['edmx:Edmx']['edmx:EntityContainer'][0].EntityType[entityTypeName][0].Property);
                    }


                    // Add entity to list
                    entities.push({
                        entitySet: entitySet.$.Name,
                        entityType: entityTypeName,
                        properties: properties.map((_p: any) => {
                            return getCommonProperties(_p, keys);
                        }),
                        navigationProperties: navigationProperties.map((_p: string) => {
                            return getNavigationProperties(schema, _p);
                        })
                    });
                }

                //console.log(JSON.stringify(entities, null, 2));
                const csvContent = entities.map(entity => {
                    let csvLine = `entity ${entity.entitySet} \n {\n`;
                    if (entity?.properties.length > 0) {
                        csvLine += entity.properties.map((_p: any) => {
                            return `\t${_p.name}: ${_p.type}`;
                        }).join(';\n');
                        csvLine += ';\n';
                    }

                    if (entity?.navigationProperties.length > 0) {
                        csvLine += entity.navigationProperties.map((_p: any) => {
                            return `\t${_p.name}: ${_p.type}`;
                        }).join(';\n');
                        csvLine += ';\n';
                    }

                    csvLine += '}';
                    return csvLine;
                }).join('\n');

                fs.writeFileSync(csvFile as string, csvContent);
                resolve(csvFile);

            });
        });
    });

}



function getCommonProperties(property: any, keys: any[]) {
    const isKey = keys.find((_key: any) => _key.$.Name === property.$.Name);
    return { name: isKey ? `key ${property.$.Name}`:property.$.Name, type: property.$.Type.split('.').pop() };
}

function getNavigationProperties(schema: any, property: any) {
    const name = property.$.Name;
    let type, partner;
    if (property.$.Type) {
        if (property.$.Type.includes('Collection(')) {
            type = property.$.Type.replace('Collection(', '').replace(')', '');
            partner = property.$.Partner;
            if (partner) {
                type = `Association to many ${getEntitySetByEntityType(schema, type)} on ${name}.${partner} = $self`;
            } else {
                type = `Association to many ${getEntitySetByEntityType(schema, type)}`;
            }

        } else {
            type = property.$.Type;
            type = `Association to one ${getEntitySetByEntityType(schema, type)}`;
        }
    } else if (property.$.Relationship) {
        const relationName = property.$.Relationship.split('.').pop();
        const association = schema.Association.find((_asso: any) => _asso.$.Name === relationName);
        const end = association?.End.find((_end: any) => _end.$.Role === property.$.ToRole);
        type = end?.$.Type;
        if (end?.$.Multiplicity === '1') {
            type = `Association to one ${getEntitySetByEntityType(schema, type)}`;
        } else {
            try {
                let dependent = association?.ReferentialConstraint[0].Dependent.find((_dep: any) => _dep.$.Role === property.$.ToRole);
                if (!dependent) {
                    dependent = association?.ReferentialConstraint[0].Dependent[0];
                }
                partner = dependent.PropertyRef[0].$.Name;
            } catch (e) {
                console.log(`failed to find dependent for ${name}`)
            }

            if (partner) {
                type = `Association to many ${getEntitySetByEntityType(schema, type)} on ${name}.${partner} = $self`;
            } else {
                type = `Association to many ${getEntitySetByEntityType(schema, type)}`;
            }
        }

    } else {
        throw new Error(`Invalid navigation property ${JSON.stringify(property)}`);
    }
    return { name, type };
}

function getEntitySetByEntityType(schema: any, type: any) {
    let entitySet
    if (schema.EntityContainer) {
        entitySet = schema.EntityContainer[0].EntitySet.find((_set: any) => _set.$.EntityType === type);
    }
    return entitySet ? entitySet.$.Name : type.split('.').pop();
}

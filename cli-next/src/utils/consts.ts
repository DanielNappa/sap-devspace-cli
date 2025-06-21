import { join } from "node:path";
import { getRandomArbitrary } from "@/utils/index.ts";

export const BAS_LOGO: string = `               +++               
               ++++++            
                 +++++++         
               +++ ++++++++      
         ---   ++++++ +++++++    
     ---------  ++++++++ +++++++ 
 --------- -------  +++++++ +++ -
------- ---------     ++++++ ----
--- ---------            --------
 --------             -------- --
-----  +++        --------  -----
--   ++++++++  -------- ---------
+++++++ ++++++++ -- ---------    
  ++++++++ +++++++  ------       
      ++++++++ +++               
         ++++++++                
            ++++++               
               +++               `;

export const BAS_INTERNAL_PROXY_PORT: number = 8887;
// Forward BAS's internal proxy for Joule
export const PROXY_LOCAL_PORT: number = getRandomArbitrary();
export const JWT_TIMEOUT = 60 * 1000; // 60s
const USER_DATA_FOLDER: string = process.env.APPDATA ||
  (process.platform == "darwin"
    ? `${process.env.HOME}/` +
      join("Library", "Preferences", "sap-devspace-cli")
    : `${process.env.HOME}/` + join(".local", "share", "sap-devspace-cli"));

export const LANDSCAPE_CONFIG_PATH: string = join(
  USER_DATA_FOLDER,
  "landscape-config.cfg",
);

export const devspaceMessages = {
  info_devspace_creating: (name: string) => `Creating Dev Space ${name}`,
  info_devspace_created: (name: string) =>
    `Successfully created Dev Space ${name}`,
  info_obtaining_key: `Obtaining SSH key`,
  info_save_pk_to_file: `Saving PK to file…`,
  info_update_config_file_with_ssh_connection:
    `Updating the config file with the SSH connection…`,
  info_ssh_config_file_updated: `SSH Config file updated!`,
  info_closing_old_tunnel: `Closing the old tunnel to the dev space…`,
  info_staring_new_tunnel: `Starting a new tunnel to the dev space…`,
  err_devspace_connect_new_window: (landscape: string, reason: string) =>
    `Can't connect the devspace ${landscape}: ${reason}`,
  err_devspace_creation: (name: string, message: string) =>
    `Error creating Dev Space ${name}: ${message}`,
  lbl_dev_space_explorer_no_dev_spaces:
    `Could not find any dev spaces in this landscape.`,
  lbl_dev_space_explorer_authentication_failure:
    `Could not authenticate to landscape.`,
  lbl_dev_space_explorer_loading: `Loading...`,
  lbl_icon_missing: (iconName: string): string =>
    `Could not find an icon named '${iconName}'. Make sure you imported the matching file.`,
  lbl_logged_in: `Logged in.`,
  lbl_not_logged_in: `Not logged in.`,
  lbl_landscape_context_status: (isLoggedIn: boolean, isDefaultOn?: boolean) =>
    `landscape-log-${isLoggedIn ? "in" : "out"}-default-${
      isDefaultOn ? "on" : "off"
    }`,
  lbl_devspace_status_runnig: `running`,
  lbl_devspace_status_not_runnig: `not_running`,
  lbl_devspace_status_error: `error`,
  lbl_devspace_status_transitioning: `transitioning`,
  lbl_devspace_context_runnig: `dev-space-running`,
  lbl_devspace_context_stopped: `dev-space-stopped`,
  lbl_devspace_context_transitioning: `dev-space-transitioning`,
  lbl_devspace_context_error: `dev-space-error`,
  lbl_delete_landscape: (label: string) =>
    `Are you sure you want to delete the '${label}' landscape?`,
  lbl_delete_devspace: (label: string, id: string) =>
    ` Are you sure you want to delete the '${label}' (${id}) dev space?`,
  lbl_yes: `Yes`,
  lbl_no: `No`,
  lbl_ai_enabled: `Default landscape is enabled.`,

  err_incorrect_jwt: (url: string) =>
    `Incorrect token recieved for ${url}. Login failed.`,
  err_listening: (message: string, url: string) =>
    `An error occurred while listening for the JWT: ${message} for ${url}`,
  err_get_jwt_timeout: (ms: number) => `Login time out in ${ms} ms.`,
  err_get_jwt_not_exists: `Personal Access Token does not exist.`,
  err_get_jwt_required: `Personal Access Token is required`,
  err_invalid_devspace_name:
    "The name must start with a letter or number and may contain any alphanumeric characters or underscores. Special characters can't be used.",
  err_open_devspace_in_bas: (landscapeUrl: string, err: string) =>
    `Cannot open the devspace ${landscapeUrl}: ${err} .`,
  err_copy_devspace_id: (err: string) =>
    `Cannot copy the dev space ID: ${err}}`,
  err_assert_unreachable: `Unexpected error.`,
  err_get_devspace: (message: string) => `Failed to get dev spaces, ${message}`,
  err_devspace_delete: (wsId: string, reason: string) =>
    `Could not delete '${wsId}': ${reason}`,
  err_ws_update: (wsId: string, reason: string) =>
    `Could not update the ${wsId}  dev space, ${reason}`,
  err_name_validation:
    `The name may contain alphanumeric charcters or undrscores. It must start with an alphanumeric character. Special characters can't be used.`,
  err_no_devspaces_in_landscape: (landscape: string) =>
    `There are no devspaces in this landscape '${landscape}'`,
  err_devspace_missing: (id: string) => `Devspace '${id}' is missing`,
  err_devspace_must_be_started: `DevSpace must be started before running it`,
  err_landscape_not_added: (landscape: string) =>
    `Falied to add landscape '${landscape}'`,
  err_url_param_missing: (query: string, name: string) =>
    `${name} parameter is missing from URL query '${query}'`,
  err_url_has_incorrect_format: (url: string) =>
    `URL ${url} has incorrect format`,
  err_open_devspace_in_code: (reason: string) =>
    `Can't open the devspace: ${reason}`,
  info_devspace_state_inital_message: (
    wsName: string,
    wsId: string,
    suspend: boolean,
  ) => `${suspend ? "Stopping" : "Starting"} ${wsName} (${wsId}) dev space`,
  info_devspace_state_updated: (
    wsName: string,
    wsId: string,
    suspend: boolean,
  ) =>
    `The ${wsName} (${wsId}) dev space was ${suspend ? "stopped" : "started"}`,
  info_wsid_copied: `The dev space ID was copied to the clipboard.`,
  info_devspace_deleted: (wsId: string) =>
    `The '${wsId}' dev space has been deleted.`,
  info_can_run_only_2_devspaces:
    `You can only run 2 dev spaces at a time. To run another dev space, you must stop a running one.`,
};

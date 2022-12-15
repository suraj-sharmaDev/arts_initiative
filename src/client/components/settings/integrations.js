import React from "react";
import EditableTextBox from "../commons/editableTextBox";
import { toast } from "react-toastify";
import styles from "./integrations.module.css";
import TutorialModal from "./tutorial";
import useTheme from "@/helpers/useTheme";

const Integrations = ({
  isAdmin,
  openAIKey,
  openAIKeyId,
  isNotionAdded,
  notionWorkspaceName,
  onEditApiKey,
  navigateToNotionOauth,
  onDeleteNotionOauth,
  prompts,
  onEditGpt3Prompts,
  bananaDevAuths,
  onEditBananaKeys,
  ...props
}) => {
  const centralAdminBananaStatus = bananaDevAuths?.centralAdminBananaStatus;
  const adminAuths = bananaDevAuths?.adminAuths;
  const [showTutorial, setShowTutorial] = React.useState(false);
  const {theme, setTheme} = useTheme();

  const getMaskedKey = () => {
    if (!openAIKey) return "";
    if (isAdmin) return openAIKey;
    return openAIKey.slice(0, 4) + "**************************************";
  };

  const onClickNotionDeleteBtn = () => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <>
            <p>Are you sure you want to delete notion integration?</p>
            <div className="w-100 d-flex justify-content-between">
              <button
                className="btn btn-danger"
                onClick={() => onDeleteNotionOauth()}
              >
                Yes Delete
              </button>
              <button className="btn btn-warning" onClick={() => closeToast()}>
                Not now
              </button>
            </div>
          </>
        </div>
      ),
      {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 12000,
      }
    );
  };

  const onClickTutorialBtn = () => {
    setShowTutorial(!showTutorial);
  };

  const renderOpenAIGpt3Integration = () => {
    return (
      <div className={styles.integrationBox}>
        <h1>Your OpenAI GPT-3 Key</h1>
        <EditableTextBox
          value={getMaskedKey()}
          placeholder={
            isAdmin
              ? "Enter OpenAI GPT-3 Key"
              : "Admin is yet to setup OpenAI key!"
          }
          callback={onEditApiKey}
          isEditable={
            isAdmin &&
            !(openAIKey && (openAIKeyId == undefined || openAIKeyId == null))
          }
        />
      </div>
    );
  };

  const renderNotionOAuthIntegration = () => {
    return (
      <div className={styles.integrationBox}>
        <h1>
          Notion Integration
          {!isNotionAdded && (
            <button
              className={styles.tutorialHelpBtn}
              onClick={onClickTutorialBtn}
            >
              <span>
                (tutorial) <i className="bi bi-info-circle-fill"></i>
              </span>
            </button>
          )}
        </h1>
        {isNotionAdded ? (
          <div className={`mt-4 ${styles.notionContainer}`}>
            <button
              className={styles.notionDeleteBtn}
              onClick={onClickNotionDeleteBtn}
            >
              <i className="bi bi-trash3"></i>
            </button>
            <img src="/images/Notion_app_logo.png" />
            <p>{notionWorkspaceName}</p>
          </div>
        ) : (
          <div>
            <button
              className={`btn btn-danger text-white ${styles.notionBtn}`}
              onClick={navigateToNotionOauth}
            >
              <img src="/images/Notion_app_logo.png" />
              Start Integration
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderOpenAIPromptIntegration = () => {
    if (!openAIKey) return null;
    const notCustomPrompt = prompts.filter((p) => p?.promptTag != "custom");
    return (
      <div className={styles.integrationBox}>
        <h1>Your GPT-3 Prompt</h1>
        <div className="d-flex mb-3">
          <span>Label</span>
          <div className="w-50 ms-3">
            <EditableTextBox
              value={notCustomPrompt?.[0]?.promptTag}
              placeholder={"Enter Prompt Label"}
              callback={(data) => onEditGpt3Prompts("promptTag", data)}
              isEditable={isAdmin}
            />
          </div>
        </div>
        <div className="d-flex">
          <span>Action</span>
          <div className="w-75 ms-2">
            <EditableTextBox
              value={notCustomPrompt?.[0]?.promptText}
              placeholder={"Enter Prompt Label"}
              callback={(data) => onEditGpt3Prompts("promptText", data)}
              isEditable={isAdmin}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderBananaDevIntegration = () => {
    if (!isAdmin) return null;
    return (
      <div className={styles.integrationBox}>
        <h1>Your BananaDev Keys</h1>
        <div className="d-flex mb-3">
          <span>API Key</span>
          <div className="w-50 ms-3">
            <EditableTextBox
              value={adminAuths?.key || ''}
              placeholder={"Enter BananaDev API Key"}
              callback={(data) => onEditBananaKeys("key", data)}
              isEditable={isAdmin}
            />
          </div>
        </div>
        <div className="d-flex">
          <span>Model Key</span>
          <div className="w-75 ms-2">
            <EditableTextBox
              value={adminAuths?.model || ''}
              placeholder={"Enter BananaDev Model Key"}
              callback={(data) => onEditBananaKeys("model", data)}
              isEditable={isAdmin}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderLightDarkModeSwitch = () => {
    const isDarkModeActive = theme == "darkMode";
    const toActivateTheme = theme == "darkMode" ? "lightMode" : "darkMode";
    return (
      <div className={styles.integrationBox}>
        <h1>App Theme</h1>
        <div className="d-flex align-items-center">
          <label className="form-check-label" htmlFor="modeSwitcher">
            Dark Mode
          </label>
          <div className="form-check form-switch ms-5">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="modeSwitcher"
              checked={isDarkModeActive}
              onChange={()=> setTheme(toActivateTheme)}
              style={{width: 50, height: 25}}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={styles.integrationContainer}>
        {renderOpenAIGpt3Integration()}
        {renderOpenAIPromptIntegration()}
        {renderBananaDevIntegration()}
        {renderNotionOAuthIntegration()}
        {renderLightDarkModeSwitch()}
      </div>
      <TutorialModal
        show={showTutorial}
        closeBtnCallback={onClickTutorialBtn}
      />
    </>
  );
};

export default Integrations;

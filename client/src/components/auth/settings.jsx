import { Modal, Button, Text, Grid } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { settingsModal } from "../../states/modal";
import { settingState } from "../../states/user";

import SettingsService from "../../services/settings.service";
import StorageService from "../../services/storage.service"

export default function Settings() {
    const [visible, setVisible] = useRecoilState(settingsModal)
    const [setting, setSettingState] = useRecoilState(settingState)

    let token = StorageService.getToken()
    let user = StorageService.getUser()

    const closeHandler = () => {
        setVisible(false);
    };

    async function setSetting(value) {
        try {
            await SettingsService.changeSetting(token, user._id, value)
            setSettingState(value)
        } catch (e) {
            alert("fatal error")
        }
    }


    return (
        <div>
            <Modal
                closeButton
                blur
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={25}>
                        <Text b size={25}>
                            News Settings
                        </Text>
                        <br />
                        <Text size={18}>
                            Filter the news on the basis on sentiment threshold
                        </Text>
                    </Text>
                </Modal.Header>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Grid.Container style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} gap={3}>
                        <Grid>
                            <Button
                                onClick={async () => await setSetting('basic')}
                                color={setting == 'basic' ? "success" : "default"}
                                shadow={setting == 'basic'} auto>
                                Basic
                            </Button>
                        </Grid>

                        <Grid>
                            <Button
                                onClick={async () => await setSetting('moderate')}
                                color={setting == 'moderate' ? "success" : "default"}
                                shadow={setting == 'moderate'} auto>
                                Moderate
                            </Button>
                        </Grid>

                        <Grid>
                            <Button
                                onClick={async () => await setSetting('strict')}
                                color={setting == 'strict' ? "success" : "default"}
                                shadow={setting == 'strict'} auto>
                                Strict
                            </Button>
                        </Grid>
                    </Grid.Container>
                </div>

            </Modal>
        </div >
    );
}
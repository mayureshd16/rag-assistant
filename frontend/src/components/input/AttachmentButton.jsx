import {

    IconButton,

    Tooltip,

    Badge

} from "@mui/material";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import { ACCEPTED_FILES } from "../../constants/files";

function AttachmentButton({

    file,

    setFile

}) {

    const openPicker = () => {

        document

            .getElementById("file-upload")

            ?.click();

    };

    return (

        <>

            <input

                id="file-upload"

                hidden

                type="file"

                accept={Object.values(ACCEPTED_FILES).flat().join(",")}

                onChange={(e) =>

                    setFile(

                        e.target.files[0]

                    )

                }

            />

            <Tooltip

                title={

                    file

                        ? file.name

                        : "Attach document"

                }

            >

                <Badge

                    color="primary"

                    variant={

                        file

                            ? "dot"

                            : "standard"

                    }

                >

                    <IconButton

                        onClick={openPicker}

                    >

                        <AttachFileIcon />

                    </IconButton>

                </Badge>

            </Tooltip>

        </>

    );

}

export default AttachmentButton;
import "./styles/attachment.css"

import { getReadableSizeFromBytes } from "../utils"

export default function Attachment({filename = "syllabus.pdf", filesize = '17.3 KB', attachment, url, thumb, onClick, style, className, ...props}) {

    return (
        <a className="attachment-class-1 row-center" href={url ?? undefined} download={true}>
            <div className="row-center" style={{gap: "15px"}}>
                <span className="material-symbols-outlined attachment-icon" style={{color: "rgba(194, 148, 255, 1)" || "rgb(255, 128, 128)" || "rgb(160, 0, 27)"}}>file_present</span>
                <p className="attachment-filename">{filename}</p>
                <p className="attachment-filesize">{getReadableSizeFromBytes(attachment.size)}</p>
            </div>
        </a>
    )
}
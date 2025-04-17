import "./styles/attachment.css"

export default function Attachment({filename = "syllabus.pdf", filesize = '17.3 KB', url, thumb, onClick, style, className, ...props}) {

    return (
        <a className="attachment-class-1 row-center" href={url ?? undefined} download={true}>
            <div className="row-center" style={{gap: "15px"}}>
                <span className="material-symbols-outlined attachment-icon" style={{color: "rgb(255, 128, 128)" || "rgb(160, 0, 27)"}}>picture_as_pdf</span>
                <p className="attachment-filename">{filename}</p>
                <p className="attachment-filesize">{filesize}</p>
            </div>
        </a>
    )
}
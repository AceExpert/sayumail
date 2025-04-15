import "./styles/attachment.css"

export default function Attachment({filename = "syllabus.pdf", url, thumb, onClick, style, className, ...props}) {

    return (
        <a className="attachment-class-1 row-center" href={url ?? undefined} download={true}>
            <div className="row-center" style={{gap: "10px"}}>
                <span className="material-symbols-outlined attachment-icon" style={{color: "rgb(142, 22, 255)"}}>picture_as_pdf</span>
                <p className="attachment-filename">{filename}</p>
            </div>
        </a>
    )
}
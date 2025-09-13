import "./styles/avatar.css";

export default function Avatar({letter = 'A', height, width, ...props}) {

    return (
        <div className="s-letter-avatar column-center">
            {letter}
        </div>
    )

}
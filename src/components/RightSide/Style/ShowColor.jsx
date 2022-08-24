import './index.css'

const ShowColor = ({ color }) => (
    <p className="p-m-show-color">
        <span
            className="s-c-diamonds"
            style={{ backgroundColor: color }}
        ></span>
        <span>{color}</span>
    </p>
)

export default ShowColor
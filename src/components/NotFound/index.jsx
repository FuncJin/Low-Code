import { Result } from 'antd'

import './index.css'

const NotFound = () => (
    <Result
        status="404"
        title="404"
        className="not-found"
        subTitle="Sorry, the page you visited does not exist."
    />
)

export default NotFound

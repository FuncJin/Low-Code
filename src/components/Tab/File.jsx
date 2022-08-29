import { Dropdown, Button, Menu } from 'antd'

import Export from './Export'
import Preview from './Preview'

const menu = (
    <Menu
        items={[
            { label: <Preview /> },
            { label: <Export /> },
        ]}
    ></Menu>
)

const File = () => {
    return (
        <Dropdown
            overlay={menu}
            placement="bottom"
            arrow
        >
            <Button type="primary">文件</Button>
        </Dropdown>
    )
}

export default File
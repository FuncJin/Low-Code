import { useContext } from 'react'
import { Dropdown, Button, Menu } from 'antd'

import context from '../../../Context'
import Ruler from './Ruler'

const View = () => {
    const { rulerSwitch, setRulerSwitch } = useContext(context)
    const bar = new Map([
        ['tmp-0', () => setRulerSwitch(!rulerSwitch)]
    ])
    const handleClick = ({ key }) => bar.get(key)()
    return (
        <Dropdown
            overlay={
                <Menu
                    items={[
                        { label: <Ruler /> },
                    ]}
                    onClick={handleClick}
                ></Menu>
            }
            placement="bottom"
            arrow
        >
            <Button type="primary">视图</Button>
        </Dropdown>
    )
}

export default View
import { useContext } from 'react'
import { Dropdown, Button, Menu } from 'antd'

import context from '../../Context'

const Back = () => (
    <span>后退</span>
)

const Forward = () => (
    <span >前进</span>
)

const SaveEditor = () => (
    <span >保存画布内容</span>
)

const ClearEditor = () => (
    <span>清空全部内容</span>
)

const ClearStore = () => (
    <span >清空本地缓存</span>
)

const Operations = () => {
    const {
        handleBackEditor,
        handleForwardEditor,
        handleSaveStore,
        handleClearContent,
    } = useContext(context)
    const bar = new Map([
        ['tmp-0', handleBackEditor],
        ['tmp-1', handleForwardEditor],
        ['tmp-2', handleSaveStore],
        ['tmp-3', () => handleClearContent(true)],
        ['tmp-4', handleClearContent],
    ])
    const handleClick = ({ key }) => bar.get(key)()
    return (
        <Dropdown overlay={
            <Menu
                items={[
                    { label: <Back fn={handleBackEditor} /> },
                    { label: <Forward fn={handleForwardEditor} /> },
                    { label: <SaveEditor fn={handleSaveStore} /> },
                    { label: <ClearEditor fn={handleClearContent} /> },
                    { label: <ClearStore fn={handleClearContent} /> },
                ]}
                onClick={handleClick}
            />
        }
            placement="bottom"
            arrow
        >
            <Button type="primary">编辑</Button>
        </Dropdown>
    )
}

export default Operations
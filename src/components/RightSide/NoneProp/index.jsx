import { Empty } from 'antd'

const NoneProps = () => (
    <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{ height: 60 }}
        className="empty"
        description={<span>请选择一个控件</span>}
    ></Empty>
)

export default NoneProps

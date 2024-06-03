import { Spin } from "antd"

const Loading = () => {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" tip="Loading" />
    </div>
}

export default Loading
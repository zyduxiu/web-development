import {React} from 'react';
import {Button,Input,Space} from 'antd'


export default function Commentblock(){
    return(
        <div>
            <Space.Compact style={{ width: '60%',
            marginLeft: '300px'}}>
                <Input defaultValue="发表一条友善的评论吧" />
                <Button type="primary">Submit</Button>
            </Space.Compact>
        </div>

    )

}
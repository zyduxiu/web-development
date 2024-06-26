import React, {useEffect, useState} from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, message, Card, Divider } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import getDoctors from "../../Service/getDoctors";
import getTypes from "../../Service/GetTypes";
import updateDoctors from "../../Service/updateDoctors";
import postType from "../../Service/postType";
import deleteProject from "../../Service/deleteProject";

const { confirm } = Modal;

const TreatmentSetting = () => {

    const defaultProjects = [
        { id: 1, code: 'P001', name: '看诊', duration: 1, price: 100, commission: 10 },
        { id: 2, code: 'P002', name: '推拿', duration: 4, price: 300, commission: 15 },
        { id: 3, code: 'P003', name: '针灸', duration: 3, price: 250, commission: 20 },
        { id: 4, code: 'P004', name: '正骨', duration: 2, price: 200, commission: 12 }
    ];


    useEffect(
        () => {
            const initialize = async () => {
                let data = await getTypes();
                const updatedProjects = data.map(project => {
                    return {
                        ...project,
                        name: project.typename,
                        duration:project.timecost,
                        price:project.cost,
                    };
                });
                setProjects(updatedProjects);
            };
            initialize();
        }
        ,[])

    const [projects, setProjects] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [filteredProjects,setFilteredProjects]=useState(null);
    const handleAdd = () => {
        setIsModalVisible(true);
        setEditingProject(null);
    };

    const handleEdit = (record) => {
        setIsModalVisible(true);
        setEditingProject(record);
    };

    const showDeleteConfirm = (id) => {
        confirm({
            title: '确定要删除这个诊疗项目吗?',
            icon: <ExclamationCircleOutlined />,
            content: '删除后无法恢复',
            onOk() {
                handleDelete(id);
            },
        });
    };
    const initialize = async () => {
        let data = await getTypes();
        const updatedProjects = data.map(project => {
            return {
                ...project,
                name: project.typename,
                duration:project.timecost,
                price:project.cost,
            };
        });
        setProjects(updatedProjects);
    };

    const handleDelete = async (id) => {
        console.log(id);
        console.log(projects);
        const inf= {
            id:id,
        }
        let data=await deleteProject(inf);
        setProjects(projects.filter(project => project.id !== id));
        initialize();
        message.success('项目已删除');
    };

    const handleSubmit =  (values) => {
        const submitConfirm = async() => {
            if (editingProject) {
                const inf={
                    code:values.code,
                    typename:values.name,
                    timecost:values.duration,
                    cost:values.price,
                    commission:values.commission
                }
                let data = await postType(inf);
                setProjects(projects.map(proj => proj.id === editingProject.id ? { ...proj, ...values } : proj));
                initialize();
                message.success('项目更新成功');
            } else {
                console.log(values);
                const inf={
                    code:values.code,
                    typename:values.name,
                    timecost:values.duration,
                    cost:values.price,
                    commission:values.commission
                }
                let data = await postType(inf);
                const newProject = { ...values, id: projects.length + 1 };
                setProjects([...projects, newProject]);
                initialize();
                message.success('项目添加成功');
            }
            setIsModalVisible(false);
        };

        confirm({
            title: '确认提交这个诊疗项目吗?',
            icon: <ExclamationCircleOutlined />,
            content: editingProject ? '将会更新项目信息' : '将会添加新的项目信息',
            onOk() {
                submitConfirm();
            },
        });
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };
    useEffect(() => {
        if(projects!==null) {
            console.log(projects);
            const handleFilter = () => {
                const filteredProjects = projects.filter(proj =>
                    proj.name.includes(searchText) || String(proj.id).includes(searchText)
                );
                setFilteredProjects(filteredProjects);
            };
            handleFilter();
            return () => {
            };
        }
    }, [projects, searchText]);

    const columns = [
        { title: '序号', dataIndex: 'id', key: 'id' },
        { title: '项目编号', dataIndex: 'code', key: 'code' },
        { title: '诊疗项目名称', dataIndex: 'name', key: 'name' },
        { title: '时长（刻钟）', dataIndex: 'duration', key: 'duration' },
        { title: '价格', dataIndex: 'price', key: 'price' },
        { title: '提成', dataIndex: 'commission', key: 'commission' },
        { title: '操作', key: 'action', render: (_, record) => (
                <>
                    <Button onClick={() => handleEdit(record)}>编辑</Button>
                    <Button onClick={() => showDeleteConfirm(record.id)}>删除</Button>
                </>
            )},]
    console.log(projects);
    return (
        <Card title="诊疗项目管理" bordered={false}>
            <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>添加诊疗项目</Button>
            <Input placeholder="搜索诊疗项目" onChange={handleSearch} style={{ width: 200, marginBottom: 16, marginLeft: 10 }} />
            <Divider />
            <Table dataSource={filteredProjects} columns={columns} rowKey="id" />
            <Modal title={editingProject ? "编辑诊疗项目" : "添加诊疗项目"} visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
                <Form initialValues={editingProject || { id: '', code: '', name: '', duration: 0, price: 0, commission: 0 }} onFinish={handleSubmit}>
                    <Form.Item name="code" label="项目编号" rules={[{ required: true, message: '请输入项目编号' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="name" label="诊疗项目名称" rules={[{ required: true, message: '请输入诊疗项目名称' }]}>
                        <Input readOnly={editingProject}/>
                    </Form.Item>
                    <Form.Item name="duration" label="时长（刻钟）" rules={[{ required: true, message: '请输入时长' }]}>
                        <InputNumber min={1} max={8} />
                    </Form.Item>
                    <Form.Item name="price" label="价格" rules={[{ required: true, message: '请输入价格' }]}>
                        <InputNumber min={1} prefix="￥" />
                    </Form.Item>
                    <Form.Item name="commission" label="提成（整数）" rules={[{ required: true, message: '请输入提成' }]}>
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default TreatmentSetting;
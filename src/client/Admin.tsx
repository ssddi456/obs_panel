// admin can edit the game session, update scores, add and edit rounds and so on
// connect backend use websockets
import * as React from 'react';
import { GameSession, GameRound } from '../types';
import { useDetail } from './sock';
import { Button, Card, Cascader, Collapse, Form, FormListFieldData, Input, Space, Spin, Table } from 'antd';
import { ColumnType } from 'antd/es/table';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { v4 as uuid } from 'uuid';
import Paragraph from 'antd/es/typography/Paragraph';

export const rounds_columns: <T>(data: {
    remove?: (index: number) => void,
}) => ({
    editable?: boolean,
    adminOnly?: boolean,
    noColor?: boolean,
} & ColumnType<T>)[] = ({
    remove
}) => [
            {
                title: '#',
                dataIndex: 'index',
                key: 'index',
                width: '3em',
                align: 'right',
                noColor: true,
                render: (text, record, index) => {
                    return {
                        props: {
                            style: { verticalAlign: 'baseline' },
                        },
                        children: (
                            <span>
                                {index + 1}
                            </span>
                        )
                    }
                }
            },
            {
                title: '位置',
                dataIndex: 'position',
                key: 'position',
                width: '6em',
                align: 'center',
                editable: true,
            },
            {
                title: '英雄',
                dataIndex: 'hero',
                key: 'hero',
                width: '12em',
                align: 'left',
                editable: true,
            },
            // {
            //     title: '表现',
            //     dataIndex: 'tag',
            //     key: 'tag',
            //     width: '10em',
            //     editable: true,
            // },
            {
                title: '分数',
                dataIndex: 'score',
                key: 'score',
                width: '6em',
                align: 'center',
                editable: true,
            },
            {
                title: '操作',
                adminOnly: true,
                dataIndex: 'operation',
                key: 'operation',
                width: '6em',
                render: (text, record, index) => {
                    return {
                        props: {
                            style: { verticalAlign: 'baseline' },
                        },
                        children: (
                            <Button
                                title='删除'
                                danger
                                onClick={() => {
                                    remove?.((record as FormListFieldData).name);
                                }}
                            >
                                <DeleteOutlined />
                            </Button>
                        )
                    };
                }
            },
        ];

// the admin page
export const Admin = () => {

    const [loading, detail, setDetail] = useDetail();



    if (loading) {
        return <Spin spinning={loading} />;
    }

    // the controll panel
    return (
        <Spin spinning={loading}>

            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={detail}
                onValuesChange={(field, fields) => {
                    console.log(fields);
                    setDetail(fields as GameSession);
                }}
                onFieldsChange={(fields, allFields) => {
                    console.log('fields, allFields', fields, allFields);
                }}
            >
                <Collapse style={{ backgroundColor: 'black' }}>
                    <Collapse.Panel header="使用方法" key="1">
                        <Button
                            href="https://www.bilibili.com/video/av939981400"
                            target='_blank'
                        >
                            &gt;&gt;&gt;&gt; obs配置方法参考 &lt;&lt;&lt;&lt;
                        </Button>
                        <br />
                        <Paragraph
                            copyable={{
                                text: 'http://localhost:5000/detail'
                            }}
                        >
                            详情页面链接: <a href="http://localhost:5000/detail" target='_blank'>http://localhost:5000/detail</a>
                        </Paragraph>
                        <Paragraph copyable={{ text: '310' }}>宽度: 310</Paragraph>
                        高度: 看着调吧
                    </Collapse.Panel >
                </Collapse>
                <Space
                    direction="vertical"
                >
                    <Card
                        title="游戏信息"
                    >

                        <Form.Item
                            label="起始分数"
                            initialValue={detail.startScore}
                            name={['startScore']}
                            getValueFromEvent={(e) => {
                                const v = e.target.value;
                                return String(v).replace(/[^0-9]|^0/g, '');
                            }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="当前分数"
                            initialValue={detail.currentScore}
                            name={['currentScore']}
                            getValueFromEvent={(e) => {
                                const v = e.target.value;
                                return String(v).replace(/[^0-9]|^0/g, '');
                            }}
                        >
                            <Input />
                        </Form.Item>
                    </Card>

                    <Form.List
                        name={['rounds']}
                    >
                        {(fields, { add, remove }, { errors }) => {

                            const wrappedEdtableColumns = rounds_columns<FormListFieldData>({
                                remove,
                            }).map(column => {
                                if (column.editable) {
                                    column.render = (text, record, index) => {
                                        const fieldName = [index, column.dataIndex as string];
                                        return (
                                            <Form.Item
                                                name={fieldName}
                                                labelCol={{ span: 0 }}
                                                wrapperCol={{ span: 24 }}
                                            >
                                                <Input />
                                            </Form.Item>
                                        );
                                    }
                                }
                                return column
                            });

                            return (
                                <Card
                                    title='回合信息'
                                    actions={[
                                        <Button onClick={() => {
                                            add({
                                                index: uuid() as any,
                                                hero: '',
                                                position: '',
                                                tag: [],
                                                score: 0,
                                            })
                                        }}>
                                            <PlusOutlined />
                                        </Button>
                                    ]}
                                >
                                    <Table
                                        columns={wrappedEdtableColumns}
                                        dataSource={fields}
                                        pagination={false}
                                        scroll={{ y: 560 }}
                                    />
                                </Card>
                            );
                        }}
                    </Form.List>
                </Space>
            </Form>
        </Spin >
    );
};

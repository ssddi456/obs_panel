// admin can edit the game session, update scores, add and edit rounds and so on
// connect backend use websockets
import * as React from 'react';
import { useDetail } from './sock';
import { Card, Col, ConfigProvider, Row, Space, Spin, Statistic, Table } from 'antd';
import { rounds_columns } from './Admin';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { GameRound } from '../types';

// the admin page
export const Detail = () => {

    const [loading, detail, setDetail, store,] = useDetail();

    // 过滤掉没填好的回合
    const filtered_rounds = detail.rounds.filter((round) => {
        return round.score && round.hero && round.position;
    }).map((x, index) => {
        x.index = index;
        return x;
    }) as any;

    const listStyle: React.CSSProperties = {
        fontWeight: 'bolder',
        fontSize: 16,
        lineHeight: 1,
    };
    const winningColor = '#73ef05';
    const losingColor = '#ff4352';

    // 按分数增加颜色
    const wrapppedColumns = rounds_columns<GameRound>({})
        .filter(x => {
            return !x.adminOnly;
        })
        .map((column) => {

            const originalRender = column.render || ((text, record, index) => text);
            column.render = (text, record, index) => {
                let children = originalRender(text, record, index);
                children = children?.children || children;
                if (!column.noColor) {
                    if (Number(record.score) > 0) {
                        children = <span style={{ color: winningColor, ...listStyle }}>{children}</span>;
                    }
                    if (Number(record.score) < 0) {
                        children = <span style={{ color: losingColor, ...listStyle }}>{children}</span>;
                    }
                }
                return {
                    props: {
                        style: {
                            padding: '6px 0px'
                        },
                    },
                    children,
                };
            };
            return column;
        });

    // calc current style
    const delta = (Number(detail.currentScore) || 0) - (Number(detail.startScore) || 0);
    const ifUp = delta > 0;
    const ifDown = delta < 0;
    const currentStyle = {
        valueStyle: {
            color: ifUp ? winningColor : ifDown ? losingColor : undefined,
        },
        prefix: ifUp ? <ArrowUpOutlined /> : ifDown ? <ArrowDownOutlined /> : null,
        suffix: (ifUp || ifDown) ? `(${delta})` : null,
    };
    // the controll panel
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBgContainer: store.getBackgroundString(),
                    colorTextTertiary: '#fff',
                    colorTextSecondary: '#fff',
                    colorText: '#fff',
                },
            }}

        >
            <Spin spinning={loading}>
                <Space
                    direction="vertical"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card>
                                <Statistic
                                    title="起始分数"
                                    value={detail.startScore}
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card>
                                <Statistic
                                    title="当前分数"
                                    value={detail.currentScore}
                                    {...currentStyle}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Card
                        bodyStyle={{
                            padding: 4,
                        }}
                    >
                        <Table
                            columns={wrapppedColumns}
                            dataSource={filtered_rounds}
                            pagination={false}
                            showHeader={false}
                        />
                    </Card>
                </Space>
            </Spin>
        </ConfigProvider>
    );
};

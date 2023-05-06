// admin can edit the game session, update scores, add and edit rounds and so on
// connect backend use websockets
import * as React from 'react';
import { useDetail } from './sock';
import { Card, Col, Form, Row, Space, Spin, Statistic, Table } from 'antd';
import { rounds_columns } from './Admin';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { GameRound, GameSession } from '../types';
import { ColumnType } from 'antd/es/table';

// the admin page
export const Detail = () => {

    const [loading, detail, setDetail] = useDetail();

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
    };

    // 按分数增加颜色
    const wrapppedColumns = rounds_columns<GameRound>({})
    .filter(x => {
        return !x.adminOnly;
    })
    .map((column) => {
        if (column.noColor) {
            return column;
        }
        const originalRender = column.render || ((text, record, index) => text);
        column.render = (text, record, index) => {
            const originalText = originalRender(text, record, index);
            if (Number(record.score) > 0) {
                return <span style={{ color: '#cf1322', ...listStyle  }}>{originalText}</span>;
            }
            if (Number(record.score) < 0) {
                return <span style={{ color: '#3f8600', ...listStyle }}>{originalText}</span>;
            }
            return originalText;
        };
        return column;
    });

    // calc current style
    const delta = (Number(detail.currentScore) || 0) - (Number(detail.startScore) || 0);
    const ifUp = delta > 0;
    const ifDown = delta < 0;
    const currentStyle = {
        valueStyle: {
            color: ifUp ? '#3f8600' : ifDown ? '#cf1322' : undefined,
        },
        prefix: ifUp ? <ArrowUpOutlined /> : ifDown ? <ArrowDownOutlined /> : null,
        suffix: (ifUp || ifDown) ? `(${delta})` : null,
    };
    // the controll panel
    return (
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
                <Card>
                    <Table
                        columns={wrapppedColumns}
                        dataSource={filtered_rounds}
                        pagination={false}
                    />
                </Card>
            </Space>
        </Spin>
    );
};

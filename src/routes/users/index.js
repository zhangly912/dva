import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './index.less';

function Users({ dispatch, list, loading, total, current, pageSize,count }) {
    console.log('进入次数')
    const isLoading = loading.effects['users/fetch'] || loading.effects['users/delete'];
    const columns = [{
        title: '真实姓名',
        dataIndex: 'realName',
        key: 'realName',
    }, {
        title: '昵称',
        dataIndex: 'nickName',
        key: 'nickName',
    }, {
        title: '角色',
        dataIndex: 'roleNames',
        key: 'roleNames',
    }, {
        title: '操作',
        dataIndex: 'Operation',
        key: 'operation',
        render: (text, record, index) => (
            <a href="javascript:;" onClick={() => deleteHandler(record.id, index)}>删除</a>
        )
    }];
    //删除
    function deleteHandler(id, index) {
        dispatch({
            type: 'users/delete',
            payload: {
                id: id,
                index: index
            }
        });
    }
    //修改当前页
    function onChange(current) {
        dispatch({
            type: 'users/fetch',
            payload: {
                current: current
            }
        });
    }

    function CountAdd(){
        console.log(22)
       dispatch({
           type:'users/getRole',
           payload:{
               count:count+1
           }
       }) 
    }
    //pageSize change 
    function onShowSizeChange(current, pageSize) {
        console.log(pageSize)
        dispatch({
            type: 'users/fetch',
            payload: {
                current: current,
                pageSize: pageSize
            }
        });
    }
    return (
        <div className={styles.normal}>
            <div>
                <div className='mb15'>
                    <Button  className="mr15"  onClick={()=>{dispatch(
                        routerRedux.push({
                            pathname: '/count',
                        })
                    )}}>跳转count</Button>
                    <Button  onClick={()=>{CountAdd()}}>{count}</Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={list}
                    loading={isLoading}
                    rowKey={record => record.id}
                    pagination={false}
                />
                <Pagination
                    className="ant-table-pagination"
                    total={total}
                    current={current}
                    pageSize={pageSize}
                    onChange={onChange}
                    showQuickJumper={true}
                    showSizeChanger={true}
                    onShowSizeChange={onShowSizeChange}
                />
            </div>
        </div>
    );
}
function mapStateToProps({ users, loading }) {
    const { list, total, current, pageSize , count } = users;
    return {
        loading,
        list,
        total,
        current,
        pageSize,
        count
    };
}
export default connect(mapStateToProps)(Users);
import React from 'react';
import FurnitureList from './FurnitureList'

import { capitalize, isEmpty } from 'lodash'
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Typography,
  List,
  Card,
  Layout, Menu, Breadcrumb, Row, Col,
  Avatar,
  Tag,
} from 'antd'

import 'antd/dist/antd.css';
import '../styles/css.css';

const { Header, Content, Footer } = Layout;



class FurnitureListContainer extends React.Component {

  render() {



    return (
      <Layout className="layout" style={{ height: '100vh' }}>
        <Header className="header">
          <div>
            <img className=""
              src="//cdn.shopify.com/s/files/1/2065/6315/files/Logo_Black_3f98b656-e3ed-4eba-ba2d-b09fe32312e6_100x.png?v=1517113137"
              alt="Mobley"
              itemProp="logo" />
          </div>
        </Header>

        <Content style={{ padding: '0 50px' }}>
          <FurnitureList />
        </Content>
        <Footer style={{ textAlign: 'center' }}> Eugene Kagan </Footer>
      </Layout>
    );
  }
}

export default FurnitureListContainer;
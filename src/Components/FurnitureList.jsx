import React from 'react';
import { filterLivingRooms } from '../api.js'
import { capitalize, isEmpty } from 'lodash'
import {
  Form,
  Radio,
  Typography,
  List,
  Card,
  Layout,
  Menu,
  Breadcrumb,
  Row,
  Col,
  Avatar,
  Tag,
  Space,
  Spin,
  Divider
} from 'antd'

import 'antd/dist/antd.css';
import '../styles/css.css';

const { Meta } = Card;


const { Title, Text } = Typography;


const DEFAULT_FILTERS = {
  budget: 'base',
  tone: 'light',
  textileColor: 'grey',
}

class FurnitureList extends React.Component {
  state = {
    ...DEFAULT_FILTERS,
    isLoading: false,
    data: [],
    count: 0,
    totalPrice: 0,
  };



  async componentDidMount() {
    const furniture = await filterLivingRooms(DEFAULT_FILTERS)

    this.setState({
      data: furniture.data,
      count: furniture.count,
      totalPrice: furniture.totalPrice,
    })
  }


  onChange = async e => {

    const { budget, tone, textileColor } = this.state

    this.setState({
      [e.target.name]: e.target.value,
      isLoading: true,
    });

    const furniture = await filterLivingRooms({ budget, tone, textileColor, [e.target.name]: e.target.value })
    this.setState({
      isLoading: false,
      data: furniture.data,
      count: furniture.count,
      totalPrice: furniture.totalPrice,
    });
  };


  getTitle = titleTyte => {
    switch (titleTyte) {
      case 'floorLamp':
        return 'Floor Lamp'
      case 'endTable':
        return 'End Table'
      case 'sideChair':
        return 'Side Chair'
      case 'sofa':
        return 'Sofa'
      case 'coffeeTable':
        return 'Coffee Table'
      default:
        return titleTyte
    }
  }

  getTextileColor = (color) => {
    switch (color) {
      case 'grey':
        return <Tag color="#808080">Textile: {capitalize(color)}</Tag>
      case 'blue':
        return <Tag color="#0000ff">Textile: {capitalize(color)}</Tag>
      case 'green':
        return <Tag color="#008000">Textile: {capitalize(color)}</Tag>
      case 'beige':
        return <Tag color="#d9b382">Textile: {capitalize(color)}</Tag>
      default:
        return color
    }
  }

  getTone = (tone) => {
    switch (tone) {
      case 'light':
        return <Tag color="#d3d3d3">Tone: {capitalize(tone)}</Tag>
      case 'dark':
        return <Tag color="#000000">Tone: {capitalize(tone)}</Tag>
      default:
        return tone
    }
  }


  render() {

    const { tone, budget, textileColor, isLoading, count, totalPrice } = this.state

    return (
      <>
        <Title level={2}>Filters</Title>
        <Form
          layout={'inline'}
          layout="inline"
          size={'small'}
        >
          <Form.Item label="Budget" name="size">
            <Radio.Group name="budget" defaultValue={budget} onChange={this.onChange}>
              <Radio.Button value="base">$90-$115</Radio.Button>
              <Radio.Button value="premium">$115+ </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Tone" name="tone">
            <Radio.Group name="tone" defaultValue={tone} onChange={this.onChange}>
              <Radio.Button value="light">Light</Radio.Button>
              <Radio.Button value="dark">Dark</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Textile Color" name="textileColor">
            <Radio.Group name="textileColor" defaultValue={textileColor} onChange={this.onChange}>
              <Radio.Button value="grey">Grey</Radio.Button>
              <Radio.Button value="blue">Blue</Radio.Button>
              <Radio.Button value="green">Green</Radio.Button>
              <Radio.Button value="beige">Beige</Radio.Button>

            </Radio.Group>
          </Form.Item>
        </Form>
        <br />
        <Title level={2}>Results</Title>
        {!isLoading && <Text type="secondary">Items Found {count} | Total Price ${totalPrice}</Text>}
        {isLoading &&
          <div className="spinWrapper">
            <Spin size="large" />
          </div>
        }
        {!isLoading && <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={this.state.data}
          renderItem={item => (
            <List.Item>
              <Card title={`${item.itemName} $${item.price}/month`}>
                <img
                  width="100%"
                  alt="example"
                  src={item.image}
                />
                <br />
                <br />
                <Meta title={this.getTitle(item.type)}
                />
                <br />
                <p>
                  {this.getTextileColor(item.textileColor)} {this.getTone(item.tone)}
                </p>
              </Card>
            </List.Item>
          )}
        />}
      </>

    );
  }
}

export default FurnitureList;
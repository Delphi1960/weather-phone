import {format, parseISO} from 'date-fns';
import React from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import {Avatar, DataTable} from 'react-native-paper';

import Button from '../../../assets/index.button';
import WeatherIcon from '../../../assets/index.icon';
import GetIconWindDirection from '../wind/GetIconWindDirection';

type Props = {
  dayData: any[];
};

export default function DayDataTable({dayData}: Props) {
  return (
    <>
      <Text
        style={{
          fontWeight: '500',
          color: 'navy',
          textAlign: 'center',
          fontSize: 18,
        }}>
        {format(parseISO(dayData[0].UTC), 'eeee, dd MMMM')}
      </Text>
      {/* <DataTable style={{ backgroundColor:'transparent'}}> */}
      <DataTable style={{backgroundColor: 'transparent', height: '96%'}}>
        <DataTable.Header style={{height: 50, marginTop: 10}}>
          <DataTable.Title>
            {/* <Image style={styles.headerIcon} source={Button["bt_time"]} /> */}
            <Avatar.Image
              size={45}
              style={{backgroundColor: 'transparet'}}
              source={Button.bt_time}
            />
          </DataTable.Title>
          <DataTable.Title>
            {/* <Image style={styles.headerIcon} source={Button["bt_cloud"]} /> */}
            <Avatar.Image size={45} source={Button.bt_cloud} />
          </DataTable.Title>
          <DataTable.Title>
            <Avatar.Image size={45} source={Button.bt_temp} />
          </DataTable.Title>
          <DataTable.Title>
            <Avatar.Image size={45} source={Button.bt_rain} />
          </DataTable.Title>
          <DataTable.Title>
            <Avatar.Image size={45} source={Button.bt_wind} />
          </DataTable.Title>
        </DataTable.Header>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView>
            {dayData.map((item, ind) => (
              <DataTable.Row key={ind}>
                <DataTable.Cell>{item.time}</DataTable.Cell>
                <DataTable.Cell>
                  <Avatar.Image
                    size={45}
                    style={{backgroundColor: 'transparet'}}
                    source={WeatherIcon[item.icon]}
                  />
                </DataTable.Cell>
                <DataTable.Cell
                  textStyle={{
                    fontWeight: '900',
                    color: Number(item.air_temperature) > 0 ? 'red' : 'blue',
                  }}>
                  {item.air_temperature + '°'}
                </DataTable.Cell>
                <DataTable.Cell>
                  {item.pricip > 0 ? item.pricip + 'мм' : ''}
                </DataTable.Cell>
                <DataTable.Cell textStyle={{marginTop: -5}}>
                  <Avatar.Image
                    size={25}
                    style={{backgroundColor: 'transparet', marginTop: 10}}
                    source={GetIconWindDirection(item.wind_from_direction)}
                  />
                  {item.wind_speed + 'м/с'}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
            <Text>{`\n`}</Text>
          </ScrollView>
        </SafeAreaView>
      </DataTable>
    </>
  );
}

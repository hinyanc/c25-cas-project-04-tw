import React, {Component} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Table, TableWrapper, Row, Rows} from 'react-native-table-component';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface TableState {
  tableHead: string[];
  tableData: (string | React.JSX.Element)[][];
}

export default class PlansTable extends Component<{}, TableState> {
  constructor(props: {}) {
    super(props);
    const tick = (
      <Ionicons
        name="checkmark-sharp"
        size={30}
        color="#E24E59"
        style={{alignSelf: 'center'}}
      />
    );
    this.state = {
      tableHead: ['Features', 'GyMatess', 'GyMatess Diamond    💎💎💎'],
      tableData: [
        ['Match. Chat. Meet.', tick, tick],
        ['See who likes you', '', tick],
        ['Super like function', '', tick],
        ['Message before matching', '', tick],
      ],
    };
  }
  render() {
    return (
      <View style={{height: 370}}>
        <ScrollView style={styles.container}>
          <Table
            style={styles.body}
            borderStyle={{borderWidth: 1, borderColor: '#FDDBDD'}}>
            <Row
              data={this.state.tableHead}
              flexArr={[1.5, 1, 1]}
              style={styles.head}
              textStyle={{
                color: '#E2868D',
                textAlign: 'center',
                fontSize: 17,
                fontWeight: 'bold',
              }}
            />
            <TableWrapper style={styles.wrapper}>
              <Rows
                data={this.state.tableData}
                flexArr={[1.5, 1]}
                style={styles.row}
                textStyle={styles.text}
              />
            </TableWrapper>
          </Table>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    width: 400,
    borderRadius: 15,
  },
  head: {
    height: 70,
    backgroundColor: 'rgba(253,219,221,0.7)',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    
  },
  wrapper: {flexDirection: 'row'},
  row: {
    flex: 1,
    height: 60,
    backgroundColor: '#fff',
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
  },
  text: {textAlign: 'center', fontSize: 17},
  body: {borderRadius: 15,},
});

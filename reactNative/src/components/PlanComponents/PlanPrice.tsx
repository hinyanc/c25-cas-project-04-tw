import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {Table, TableWrapper, Row, Rows} from 'react-native-table-component';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface TableState {
  tableHead: (string | React.JSX.Element)[];
  tableData: (string | React.JSX.Element)[][];
}

export default class PlansTable extends Component<{}, TableState> {
  constructor(props: {}) {
    super(props);
    const priceTag = (
      <Ionicons
        name="pricetags-outline"
        size={30}
        color="#E24E59"
        style={{alignSelf: 'center'}}
      />
    );
    const period = (
        <Ionicons
          name="ios-calendar-sharp"
          size={30}
          color="#E24E59"
          style={{alignSelf: 'center'}}
        />
      );
    this.state = {
      tableHead: [period, priceTag],
      tableData: [
        ['7 Days', '✨ FREE ✨                             with promotion code'],
        ['1 Month', '$29.9 / month'],
        ['Half Year', '$19.9 / month'],
        ['1 Year', '$9.9 / month'],
      ],
    };
  }
  render() {
    return (
      <View>
        <Text style={styles.modalTitle}>
          Limited promotion for our GyMatess Diamond 💎
        </Text>
        <View style={{height: 370}}>
          <ScrollView style={styles.container}>
            <Table
              style={styles.body}
              borderStyle={{borderWidth: 1, borderColor: '#FDDBDD'}}>
              <Row
                data={this.state.tableHead}
                flexArr={[1, 1.5]}
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
                  flexArr={[1, 1.5]}
                  style={styles.row}
                  textStyle={styles.text}
                />
              </TableWrapper>
            </Table>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalTitle: {
    marginTop: 30,
    textAlign: 'center',
    color: '#E24E59',
    fontSize: 20,
    fontWeight: 'bold',
  },
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
  body: {borderRadius: 15},
});

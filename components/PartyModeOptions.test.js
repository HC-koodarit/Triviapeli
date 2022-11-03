import React from "react";
import PartyModeOptions from "./PartyModeOptions";
import renderer from 'react-test-renderer';
import { FlatList, Text } from 'react-native'



it('renders the Flatlist component', () => {
  const tree = renderer.create(
    <FlatList
      data={['item1', 'item2']}
      keyExtractor={item => item}
      renderItem={({item}) => <Text>{item}</Text>}
      />
  ).toJSON();

});
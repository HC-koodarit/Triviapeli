import React from "react";
import PartyModeOptions from "../PartyModeOptions";
import renderer from 'react-test-renderer';
import { FlatList, Text } from 'react-native'
import { executeNativeBackPress } from "react-native-screens";


/*
it('renders the Flatlist component', () => {
  const tree = renderer.create(
    <FlatList
      data={['item1', 'item2']}
      keyExtractor={item => item}
      renderItem={({item}) => <Text>{item}</Text>}
      />
  ).toJSON();
  expect(tree).toMatchSnapshot();

});

describe("Filter function", () => {
  test("it should filter by a search term (link)", () => {
    const input = [
      { id: 1, url: "https://www.url1.dev" },
      { id: 2, url: "https://www.url2.dev" },
      { id: 3, url: "https://www.link3.dev" }
    ];

    const output = [{ id: 3, url: "https://www.link3.dev" }];

    expect(filterByTerm(input, "link")).toEqual(output);

  });
});
*/
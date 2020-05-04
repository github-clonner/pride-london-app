// @flow
import React from "react";
import { shallow } from "enzyme";
import { sampleOne, generateImageDetails } from "../data/__test-data";
import { ImageBackground } from "./ImageBackground";

it("renders correctly", () => {
  const getImageDetails = () => sampleOne(generateImageDetails);
  const reference = { sys: { id: "a" } };
  const output = shallow(
    <ImageBackground
      getImageDetails={getImageDetails}
      reference={reference}
      resizeMode="contain"
      accessibilityLabel="Test Label"
    />
  );
  expect(output).toMatchSnapshot();
});

import * as React from 'react';
import {render, screen} from '@testing-library/react-native'

import { MonoText } from '../StyledText';

it(`renders correctly`, () => {
  render(<MonoText>Snapshot test!</MonoText>);

  screen.findByText("Snapshot Test!");
  expect(screen.toJSON()).toMatchSnapshot()

});

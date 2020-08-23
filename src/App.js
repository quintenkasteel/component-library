import { hot } from 'react-hot-loader/root';
import React from 'react';
import styled from 'styled-components';
import './library/styles.scss';
// import SEO from './Library/Page-settings/seo';

import Row from './library/layout/Row';
import Layout from './library/layout/layout';
import Col from './library/layout/Column';
import Grid from './library/layout/Grid';
import Container from './library/layout/Container';

import Link from './library/components/Link';
import Divider from './library/components/Divider';
import Button from './library/components/Button.js';
import Image from './library/components/Image';
import Heading from './library/components/Heading';
import Text from './library/components/Text';
import Video from './library/components/video/Video';

import Input from './library/components/form/inputs/Input';
import Checkbox from './library/components/form/inputs/Checkbox';
import {RadioGroup, RadioButton} from './library/components/form/inputs/RadioButton';

import ColorPicker from './library/components/form/inputs/ColorPicker.js';
import DateSelect from './library/components/form/inputs/DatePicker';
import Tel from './library/components/form/inputs/Tel';
import Select from './library/components/form/inputs/Select';
import Accordion from './library/components/Accordion';
import Tabs from './library/components/Tabs';
import Progress from './library/components/Progress';
import Modal from './library/components/Modal';
import Sticky from './library/components/Sticky';
import PageProgress from './library/components/PageProgress';
import MasonryGrid from './library/layout/MasonryGrid';
import Slider from './library/components/Slider';
import Cart from './library/layout/Store/Cart/Cart';
import Products from './library/layout/Store/Products';
import StoreProvider from './library/layout/Store/Context/StoreProvider';
import Checkout from './library/layout/Store/Cart/Checkout';

let StyledBackground = styled.div`
  background: linear-gradient(to bottom, #f9fbfd 0, #fff 100%);
`;

const App = () => (
  <Layout>
    <Container>
      <Grid>
        <Row>
          <Col width={6}>
            <Heading heading="h1">Heading 1</Heading>
            <Heading heading="h2">Heading 2</Heading>
            <Heading heading="h3">Heading 3</Heading>
            <Heading heading="h4">Heading 4</Heading>
            <Heading heading="h5">Heading 5</Heading>
            <Heading heading="h6">Heading 6</Heading>
            <Heading heading="p">Heading P</Heading>
          </Col>
          <Col width={6}>
            <Text>
              <ul>
                <li>Heading P</li>
                <li>Heading P</li>
                <li>Heading P</li>
                <li>Heading P</li>
              </ul>
            </Text>
          </Col>
        </Row>
        <Row>
          <Col width={12}>
            <Video
              lazy
              onEnded={() => console.log('ended')}
              video="https://vimeo.com/88991219"
            />
          </Col>
        </Row>

        <Row>
          <Col width={12}>
            <Heading underlined heading="h1">
              Buttons
            </Heading>
          </Col>
        </Row>
        <Row>
          <Col width={4}>
            <Heading heading="h2">Large Buttons</Heading>
            <Button width="50%" primary to={'/'}>
              Primary
            </Button>
            <Button width="50%" primary disabled to={'/'}>
              Primary Disabled
            </Button>
            <Button width="50%" primary light to={'/'}>
              Primary Light
            </Button>
            <Button width="50%" primary disabled light to={'/'}>
              Light Disabled
            </Button>
            <Button width="50%" primary inverse to={'/'}>
              Primary Inverse
            </Button>
            <Button width="50%" primary disabled inverse to={'/'}>
              Inverse Disabled
            </Button>
            <Button width="50%" primary to={'/'}>
              With Icon
            </Button>
            <Button width="50%" primary disabled to={'/'}>
              With Icon Disabled
            </Button>
          </Col>
          <Col width={4}>
            <Heading heading="h2">Small Buttons</Heading>
            <Button width="50%" small primary to={'/'}>
              Small Primary
            </Button>
            <Button width="50%" small primary disabled to={'/'}>
              Small Primary
            </Button>
            <Button width="50%" small primary light to={'/'}>
              Small Primary Light
            </Button>
            <Button width="50%" small primary disabled light to={'/'}>
              {' '}
              Disabled
            </Button>
            <Button width="50%" small primary inverse to={'/'}>
              Small Primary Inverse
            </Button>
            <Button width="50%" small primary disabled inverse to={'/'}>
              Disabled
            </Button>
            <Button width="50%" small primary to={'/'}>
              With Icon
            </Button>
            <Button width="50%" small primary disabled to={'/'}>
              With Icon Disabled
            </Button>
          </Col>
          <Col width={4}>
            <Heading heading="h2">Other Buttons</Heading>
            <Button primary to={'/'}>
              Primary
            </Button>
            <Button primary disabled to={'/'}>
              Primary
            </Button>
            <Button primary light to={'/'}>
              Primary Light
            </Button>
            <Button primary disabled light to={'/'}>
              Primary Light
            </Button>
            <Button primary inverse to={'/'}>
              Primary Inverse
            </Button>
            <Button primary disabled inverse to={'/'}>
              Primary Inverse
            </Button>
            <Button primary to={'/'}>
              With Icon
            </Button>
            <Button primary disabled to={'/'}>
              With Icon
            </Button>
          </Col>
        </Row>
        <Row>
          <Col width={12}>
            <Heading underlined heading="h1">
              Form fields
            </Heading>
          </Col>
        </Row>
        <Row>
          <Col width={4}>
            <Heading heading="h2">Normal Inputs</Heading>
            <Input type="email" placeholder="Email placeholder" />
            <Input type="password" placeholder="Password placeholder" />
            <Input type="text" placeholder="Text placeholder" />
            <Input type="email" error="error" placeholder="Email placeholder" />
            <Input
              error
              type="password"
              error="error"
              placeholder="Password placeholder"
            />
            <Input type="text" error="error" placeholder="Text placeholder" />
          </Col>
          <Col width={4}>
            <Heading heading="h2">Select Inputs</Heading>
            <ColorPicker />
            <Tel />
            <DateSelect onChange={e => console.log(e)} />
            <Select searchable multiselect title="Dropdown Select" />
          </Col>
          <Col width={4}>
            <Heading heading="h2">Normal Inputs</Heading>
            <Checkbox label="Checkbox" />
            <Checkbox disabled label="Checkbox" />
            <Checkbox toggle label="Checkbox Toggle" />
            <Checkbox toggle disabled label="Checkbox Toggle Disabled" />
            <RadioGroup label="Radio Field">
              <RadioButton label="Radio Field" />
              <RadioButton disabled label="Radio Field disabled" />
              <RadioButton disabled label="Radio Field disabled" />
              <RadioButton toggle label="Radio Field Switch" />
              <RadioButton toggle label="Radio Field Switch" />
              <RadioButton
                name="fourth"
                toggle
                disabled
                label="Radio Field Switch disabled"
              />
              <RadioButton
                name="fourth"
                toggle
                disabled
                label="Radio Field Switch disabled"
              />
            </RadioGroup>
          </Col>
        </Row>
        <Row>
          <Col width={6}>
            <Accordion label="Accordion 1">
              <p>test</p>
            </Accordion>
            <Accordion label="Accordion 2">
              <p>test</p>
            </Accordion>
            <Accordion label="Accordion 3">
              <p>test</p>
            </Accordion>
            <Accordion label="Accordion 4">
              <p>test</p>
            </Accordion>
          </Col>
          <Col width={6}>
            <Tabs selected={1}>
              <div title="first">This is the first panel</div>
              <div title="second">This is the second panel</div>
              <div title="third">This is the third panel</div>
            </Tabs>
          </Col>
        </Row>
        <Row>
          <Col width={6}>
            <Progress percent={60} color="blue" />
            <Modal>
              <Heading heading="h4">Heading 4</Heading>
            </Modal>
            <Sticky fixed top right from={100}>
              <Heading heading="h3">this is stick</Heading>
            </Sticky>
            <PageProgress />
          </Col>
          <Col width={6}></Col>
        </Row>
        <Row>
          <Col width={12}>
            <Slider slideCount={1} showCount={3}>
              <div>
                <img src="https://source.unsplash.com/user/erondu" />
              </div>
              <div>
                <img src="https://source.unsplash.com/user/hayleykimdesign" />
              </div>
              <div>
                <img src="https://source.unsplash.com/collection/8469893" />
              </div>
              <div>
                <img src="https://source.unsplash.com/random" />
              </div>
              <div>
                <img src="https://source.unsplash.com/user/jeannerosegomez" />
              </div>
              <div>
                <img src="https://source.unsplash.com/user/osillbury" />
              </div>
              <div>
                <img src="https://source.unsplash.com/collection/1758353" />
              </div>
              <div>
                <img src="https://source.unsplash.com/collection/1118894" />
              </div>
              <div>
                <img src="https://source.unsplash.com/collection/1360971" />
              </div>
            </Slider>
          </Col>
          <Col>
            <StoreProvider>
              <Products />
              <Cart />
              <Checkout />
            </StoreProvider>
          </Col>
        </Row>
      </Grid>

      <MasonryGrid columnsLg={4}>
        <div>Masonry item 1</div>
        <div>Masonry item 2</div>
        <div>Masonry item 3</div>
        <div>Masonry item 4</div>
        <div>Masonry item 5</div>
        <div>Masonry item 6</div>
        <div>Masonry item 7</div>
        <div>Masonry item 8</div>
        <div>Masonry item 9</div>
        <div>Masonry item 10</div>
        <div>Masonry item 11</div>
      </MasonryGrid>
    </Container>
  </Layout>
);

export default hot(App);

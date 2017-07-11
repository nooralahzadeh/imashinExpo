import React, { Component } from 'react';
import {
   View,
   Text,
   Image,
   TouchableOpacity,
   PixelRatio,
   ScrollView,
   Dimensions,
   Platform
    } from 'react-native';

import {BasicPicker,CascadePicker} from 'react-native-picker-xg';
import Slider from 'react-native-slider';
import { connect } from 'react-redux';
import { productUpdate, getModelsList, getYearList} from '../actions';
import { CardSection, Input } from './common';
//import ImagePicker from 'react-native-image-picker';
import Thumb from "./common/Thumb";
import product from "./Styles/product";
import {Actions} from "react-native-router-flux";
import { Ionicons } from '@expo/vector-icons';
import { Container, Content, Form, Item, Label, Header, Button, Left, Icon, Picker} from 'native-base';
import { SegmentedControls } from 'react-native-radio-buttons';
//import MapView from 'react-native-maps';
import Expo from 'expo';
import Modal from 'react-native-modal';

const {width, height, scale} = Dimensions.get("window");

const shop = require('./Styles/shop.js').default;


const maxPhoto=6;

class ProductForm extends Component {

  state = {
     images:[],
     mapRegion: null,
     lastLat: null,
     lastLong: null,
     isModalVisible: false,
    // brandData: [],
     selectedPlaque:'0',
     selectedBrand:'0',
     selectedModel:'0',
     selectedBodyColor:'0',
     selectedInteriorColor:'0',
     selectedBodyState:'0',
     selectedAutoClass:'0',
     selectedFuleType:{},
     selectedGearType:{},
     selectedGearTypeIndex:1,
     selectedFuleTypeIndex:0,
     selectedKilometer:0,
     selectedYear:'0'
     //showBrandPicker:false,
  };

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }
      this.onRegionChange(region, region.latitude, region.longitude);

    });

  //  this.setState({brandData:this.props.brands})

  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set use the the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);

  }


  onMapPress(e) {
     console.log(e.nativeEvent.coordinate.longitude);
     let region = {
       latitude:       e.nativeEvent.coordinate.latitude,
       longitude:      e.nativeEvent.coordinate.longitude,
       latitudeDelta:  0.00922*1.5,
       longitudeDelta: 0.00421*1.5
     }
     this.onRegionChange(region, region.latitude, region.longitude);
   }

  _showModal = () => this.setState({ isModalVisible: true })
  _hideModal = () => this.setState({ isModalVisible: false })
  //_showBrandsPicker = () => console.log(this.state.brandData);
  //_hideBrandsPicker = () => this.setState({ showBrandPicker: false })

  deleteImage(index){
   //let images = this.state.images;
  //  images.splice(deleteProp.number ,1);
  //  this.setState({images : images});


  const images = this.state.images;
  const newImages = [...images.slice(0, index), ...images.slice(index + 1, images.length)];
  let newState = { images: newImages };
  this.setState(newState);

  };

   _onPressCammeraButton = async () => {

    let result = await Expo.ImagePicker.launchCameraAsync({
     allowsEditing: true,
      aspect: [4,3]
     });

     if (!result.cancelled) {
       let source= { uri: result.uri };
       this.setState({
         images: this.state.images.concat([source])
                   });
       this.setState({ isModalVisible: false });
       //this.setState({ image: result.uri });
     } else{
       this.setState({ isModalVisible: false });
     }

   }

  _onPressLibraryButton= async () => {
    let result = await Expo.ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });


    if (!result.cancelled) {
      let source= { uri: result.uri };
      this.setState({
        images: this.state.images.concat([source])
                  });
      this.setState({ isModalVisible: false });
      //this.setState({ image: result.uri });
    } else{
      this.setState({ isModalVisible: false });
    }

  };

  _onPlaqueTypeSelection (value: string) {

        this.setState({selectedPlaque:value});

      };

  _onBodyColorSelection (value: string) {

            this.setState({selectedBodyColor:value});

          };

  _onInterionColorSelection (value: string) {
           this.setState({selectedInteriorColor:value});

          };

  _onAutoClassSelection (value: string) {
           this.setState({selectedAutoClass:value});

          };

 _onBodyStateSelection (value: string) {
             this.setState({selectedBodyState:value});
            };

  _onBrandSelection (value: string) {
        this.setState({selectedBrand:value});
        this.setState({selectedModel:'0'});
        this.props.getModelsList(value);

      };

  _onModelSelection (value: string) {
            this.setState({selectedModel:value});
            var model=this.props.models.filter(model => model.value === value);

            this.props.getYearList(model[0].selected);

          };

  _onYearSelection (value: string) {
                    this.setState({selectedYear:value});
                  };

  _renderPlaqueTypePicker() {
                  let data=[{"label":"انتخاب نوع پلاک","value":"0"}];

                  for(var i=0;i<this.props.plaqueTypes.length;i++){
                    data.push(this.props.plaqueTypes[i]);
                  };
                  return(
                        <Picker style={{ paddingLeft: 140, width:(Platform.OS === 'ios') ? undefined : 120 }}
                                          iosHeader="انتخاب کنید"
                                          mode="dropdown"
                                          selectedValue={this.state.selectedPlaque}
                                          inLineLabel={true}
                                          onValueChange={this._onPlaqueTypeSelection.bind(this)}
                                         >
                                         {
                                               data.map((member, key) =>
                                                 <Picker.Item key={key} label={member.label} value={member.value} />
                                               )
                                             }


                       </Picker>
                      )
              };

  _renderBrandPicker() {
          let data=[{"label":"انتخاب برند","value":"0"}];

          for(var i=0;i<this.props.brands.length;i++){
            data.push(this.props.brands[i]);
          };
          return(
                <Picker style={{ paddingLeft: 140, width:(Platform.OS === 'ios') ? undefined : 120 }}
                                  iosHeader="انتخاب کنید"
                                  mode="dropdown"
                                  selectedValue={this.state.selectedBrand}
                                  inLineLabel={true}
                                  onValueChange={this._onBrandSelection.bind(this)}
                                 >
                                 {
                                       data.map((member, key) =>
                                         <Picker.Item key={key} label={member.label} value={member.value} />
                                       )
                                     }


               </Picker>
              )
      };

  _renderModelPicker() {
              let data=[{"label":"انتخاب مدل","value":"0"}];
              if(!this.props.models_loading){
                  for(var i=0;i<this.props.models.length;i++){
                    data.push(this.props.models[i]);
                  };
              return(
                    <Picker style={{ paddingLeft: 140, width:(Platform.OS === 'ios') ? undefined : 120 }}
                                      iosHeader="انتخاب کنید"
                                      mode="dropdown"
                                      selectedValue={this.state.selectedModel}
                                      inLineLabel={true}
                                      onValueChange={this._onModelSelection.bind(this)}
                                     >
                                     {
                                           data.map((member, key) =>
                                             <Picker.Item key={key} label={member.label} value={member.value} />
                                           )
                                         }


                   </Picker>
                  )
            }

      };


      _renderYearPicker() {
                  let data=[{"label":"انتخاب سال ساخت","value":"0"}];
                  if(!this.props.yearList_loading){
                      for(var i=0;i<this.props.yearList.length;i++){
                        data.push(this.props.yearList[i]);
                      };
                  return(
                        <Picker style={{ paddingLeft: 140, width:(Platform.OS === 'ios') ? undefined : 120 }}
                                          iosHeader="انتخاب کنید"
                                          mode="dropdown"
                                          selectedValue={this.state.selectedYear}
                                          inLineLabel={true}
                                          onValueChange={this._onYearSelection.bind(this)}
                                         >
                                         {
                                               data.map((member, key) =>
                                                 <Picker.Item key={key} label={member.label} value={member.value} />
                                               )
                                             }


                       </Picker>
                      )
                }

          };

    _renderBodyColorPicker() {
                    let data=[{"label":"انتخاب رنگ بدنه","value":"0"}];

                      for(var i=0;i<this.props.bodyColors.length;i++){
                        data.push(this.props.bodyColors[i]);
                      };
                      return(
                            <Picker style={{ paddingLeft: 140, width:(Platform.OS === 'ios') ? undefined : 120 }}
                                              iosHeader="انتخاب کنید"
                                              mode="dropdown"
                                              selectedValue={this.state.selectedBodyColor}
                                              inLineLabel={true}
                                              onValueChange={this._onBodyColorSelection.bind(this)}
                                             >
                                             {
                                                   data.map((member, key) =>
                                                     <Picker.Item key={key} label={member.label} value={member.value} />
                                                   )
                                                 }


                           </Picker>
                          )
                  };

    _renderInteriorColorPicker() {
                      let data=[{"label":"انتخاب رنگ داخلی","value":"0"}];

                                    for(var i=0;i<this.props.interiorColors.length;i++){
                                      data.push(this.props.interiorColors[i]);
                                    };
                      return(
                              <Picker style={{ paddingLeft: 140, width:(Platform.OS === 'ios') ? undefined : 120 }}
                                                            iosHeader="انتخاب کنید"
                                                            mode="dropdown"
                                                            selectedValue={this.state.selectedInteriorColor}
                                                            inLineLabel={true}
                                                            onValueChange={this._onInterionColorSelection.bind(this)}
                                                           >
                                                           {
                                                                 data.map((member, key) =>
                                                                   <Picker.Item key={key} label={member.label} value={member.value} />
                                                                 )
                                                               }


                                </Picker>
                    )
                };

    _renderBodyStatePicker() {
                        let data=[{"label":"انتخاب وضعیت بدنه","value":"0"}];

                          for(var i=0;i<this.props.bodyStates.length;i++){
                            data.push(this.props.bodyStates[i]);
                          };
                  return(
                    <Picker style={{ paddingLeft: 140, width:(Platform.OS === 'ios') ? undefined : 120 }}
                                                  iosHeader="انتخاب کنید"
                                                  mode="dropdown"
                                                  selectedValue={this.state.selectedBodyState}
                                                  inLineLabel={true}
                                                  onValueChange={this._onBodyStateSelection.bind(this)}
                                                 >
                                                 {
                                                       data.map((member, key) =>
                                                         <Picker.Item key={key} label={member.label} value={member.value} />
                                                       )
                                                     }


                      </Picker>
                        )
                };

    _renderAutoClassPicker() {
                         let data=[{"label":"انتخاب کلاس خودرو","value":"0"}];

                          for(var i=0;i<this.props.autoClasses.length;i++){
                            data.push(this.props.autoClasses[i]);
                          };
                  return(
                    <Picker style={{ paddingLeft: 140, width:(Platform.OS === 'ios') ? undefined : 120 }}
                                                  iosHeader="انتخاب کنید"
                                                  mode="dropdown"
                                                  selectedValue={this.state.selectedAutoClass}
                                                  inLineLabel={true}
                                                  onValueChange={this._onAutoClassSelection.bind(this)}
                                                 >
                                                 {
                                                       data.map((member, key) =>
                                                         <Picker.Item key={key} label={member.label} value={member.value} />
                                                       )
                                                     }


                      </Picker>
                        )
                };

      _renderFuleType(){
          const orderoptions = [
              {
                label: 'بنزین',
                value: '1'
              },

              {
                label: 'دوگانه سوز',
                value: '2'
              },
              {
                label: 'دیزل',
                value: '4'
              },
              {
                label: 'هایبرید',
                value: '3'
              },
              {
                label: 'برقی',
                value: '5'
              },


        ]

        function setSelectedOption(selectedFuleType,selectedFuleTypeIndex){
                this.setState({
                  selectedFuleType:selectedFuleType,
                  selectedFuleTypeIndex:selectedFuleTypeIndex
                });
              }
              return (
                <View style={{ padding: 20, backgroundColor: 'white'}}>
                  {/* <Text style={{paddingBottom: 10}}>سوخت</Text> */}
                  <SegmentedControls
                    options={ orderoptions }
                    selectedIndex={this.state.selectedFuleTypeIndex}
                    onSelection={ setSelectedOption.bind(this) }
                    selectedOption={this.state.selectedFuleType}
                    extractText={  (option) => option.label}
                  />
                </View>);
          };


    _renderGearType(){
        const orderoptions = [
            {
              label:   'اتوماتیک',
              value: '2'
            },

            {
              label: 'دنده ای',
              value: '1'
            },


      ]

      function setSelectedOption(selectedGearType,selectedGearTypeIndex){
              this.setState({
                selectedGearType:selectedGearType,
                selectedGearTypeIndex:selectedGearTypeIndex
              });
            }
            return (
              <View style={{ padding: 20, backgroundColor: 'white'}}>
                {/* <Text style={{paddingBottom: 10}}> گیربکس</Text> */}
                <SegmentedControls
                  options={ orderoptions }
                  selectedIndex={this.state.selectedGearTypeIndex}
                  onSelection={ setSelectedOption.bind(this) }
                  selectedOption={this.state.selectedGearType}
                  extractText={  (option) => option.label}
                />
              </View>);
        };


  render() {

    return (
   <Container>
     <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' onPress={Actions.home} />
                        </Button>
                    </Left>

      </Header>

      <Content>

        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.5)'}}>
        <ScrollView style={{height: 220}}
                    directionalLockEnabled={true}
                    horizontal={true}>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
               {this.state.images.map((source, i) => {
                 return  (
                                 <Thumb key={source+i} number={i} uri={source} onDelete={this.deleteImage.bind(this,i)} />
                          )
                              })}

                    { this.state.images.length <maxPhoto ?
                      <TouchableOpacity onPress={this._showModal}>
                        <View style={shop.panel}>
                          {/* <Image source={{uri:Expo.Asset.fromModule(require('./../images/icon-camera.png')).uri}} style={shop.imagePanel}></Image> */}
                           <Ionicons name="md-camera" size={80} />
                        </View>
                      </TouchableOpacity>
                      : <Text></Text>}

            </View>

      </ScrollView>
    </View>
    <View>
                              <Item>
                                {/* <Label>نوع پلاک</Label> */}
                                {this._renderPlaqueTypePicker()}
                              </Item>
                              <Item>
                                {/* <Label>برند</Label> */}
                                {this._renderBrandPicker()}
                              </Item>
                           <Item>
                               {/* <Label>مدل</Label> */}
                              {this._renderModelPicker()}
                           </Item>
                           <Item>
                              {this._renderYearPicker()}
                           </Item>

                           <Expo.MapView
                                 style={{width:width, height:220}}
                                 region={this.state.mapRegion}
                                 showsUserLocation={true}
                                 followUserLocation={true}
                                 onRegionChange={this.onRegionChange.bind(this)}
                                 onPress={this.onMapPress.bind(this)}>
                                 <Expo.MapView.Marker draggable
                                   title="محل وسیله نقلیه"
                                   coordinate={{
                                     latitude: (this.state.lastLat + 0.00050) || -36.82339,
                                     longitude: (this.state.lastLong + 0.00050) || -73.03569,
                                   }}
                                   onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
                                   >
                                   {/* <View>
                                     <Text style={{color: '#000'}}>
                                       محل خودرو
                                     </Text>
                                   </View> */}
                                 </Expo.MapView.Marker>
                               </Expo.MapView>

                            <Item>

                                  {this._renderBodyColorPicker()}
                            </Item>
                            <Item>

                                  {this._renderInteriorColorPicker()}
                            </Item>
                            <Item>

                                  {this._renderBodyStatePicker()}
                            </Item>
                            {this._renderFuleType()}
                            {this._renderGearType()}
                            <Item>
                                  {this._renderAutoClassPicker()}
                            </Item>


                            <Slider
                            value={this.state.selectedKilometer}
                            trackStyle={styles.track}
                            thumbStyle={styles.thumb}
                            minimumTrackTintColor='#2f2f2f'
                            onValueChange={(value) => this.setState({selectedKilometer:value})} />
                           <Text>Value: {this.state.selectedKilometer}</Text>



    </View>
    <View style={{ flex: 1 }}>
      <Modal isVisible={this.state.isModalVisible} style={styles.bottomModal}>
        <View style={styles.modalContent}>
          <Button light block onPress={this._onPressCammeraButton.bind(this)}>
                        <Text>گرفتن عکس</Text>
          </Button>
          <Button block light onPress={this._onPressLibraryButton.bind(this)}>
                        <Text>انتخاب از گالری</Text>
          </Button>
          <Button block light onPress={this._hideModal}>
                        <Text>انصراف</Text>
          </Button>
        </View>
      </Modal>
    </View>

      {/* <CardSection>
          <Input
            label=""
            placeholder="BMW"
            value={this.props.title}
            onChangeText={value => this.props.productUpdate({ prop: 'title', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Price"
            placeholder="ERUO 10000"
            value={this.props.phone}
            onChangeText={value => this.props.productUpdate({ prop: 'price', value })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Thumbnail_image"
            placeholder=""
            value={this.props.thumbnail_image}
            onChangeText={value => this.props.productUpdate({ prop: 'thumbnail_image', value })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Image"
            placeholder=""
            value={this.props.image}
            onChangeText={value => this.props.productUpdate({ prop: 'image', value })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="URL"
            placeholder=""
            value={this.props.url}
            onChangeText={value => this.props.productUpdate({ prop: 'url', value })}
          />
        </CardSection>
      </View> */}
  </Content>
</Container>
    );
  }
}

const styles = {

  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  KMcontainer: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10,
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    track: {
      height: 1,
      backgroundColor: '#303030',
    },
    thumb: {
      width: 20,
      height: 20,
      top: 22 ,
      backgroundColor: 'rgba(150, 150, 150, 0.3)',
      borderColor: 'rgba(150, 150, 150, 0.6)',
      borderWidth: 14,
      borderRadius: 15,
    }

};



const mapStateToProps = ({baseItems}) => {
    const {brands,models,models_loading,plaqueTypes,bodyColors,interiorColors,bodyStates,autoClasses,yearList,yearList_loading} =baseItems

    return {brands,models,models_loading,yearList_loading,plaqueTypes,bodyColors,interiorColors,bodyStates,autoClasses,yearList};
};

export default connect(mapStateToProps, { productUpdate,getModelsList, getYearList})(ProductForm);

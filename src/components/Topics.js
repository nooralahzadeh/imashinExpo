import React, { Component } from 'react';
import { View, Button, Text, Overlay, Heading } from '@shoutem/ui';

import map from "./Styles/map";
const TOPICS = ['food', 'drinks', 'coffee', 'shops', 'sights', 'arts'];


const BottomTopics = ({ onTopicSelect }) => (
    <View styleName="horizontal">
        {TOPICS.map(topic => (
            <Button onPress={() => onTopicSelect(topic)} key={topic} styleName="muted">
                <Text>{topic}</Text>
            </Button>
         ))}
    </View>
);

export { BottomTopics };

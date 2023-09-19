import React, { Component, RefObject } from 'react';

interface OpenViduVideoProps {
  streamManager: any; // Replace 'any' with the appropriate type of streamManager if available
  isMe: boolean;
}

export default class OpenViduVideoComponent extends Component<OpenViduVideoProps> {
  private videoRef: RefObject<HTMLVideoElement>;

  constructor(props: OpenViduVideoProps) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidUpdate(prevProps: OpenViduVideoProps) {
    if (this.props.streamManager !== undefined && this.props.streamManager !== prevProps.streamManager && !!this.videoRef.current) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  componentDidMount() {
    if (this.props.streamManager !== undefined && this.props.streamManager && !!this.videoRef.current) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  render() {
    return <video autoPlay={true} ref={this.videoRef} muted={this.props.isMe ? true : false} id={this.props.isMe ? "me" : "notMe"}/>;
  }
}

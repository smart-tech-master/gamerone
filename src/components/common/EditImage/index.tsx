import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import ModalWrapper from 'components/common/Modal/ModalWrapper';
import Button, { ButtonSchemeEnum } from 'components/common/Button';

export interface Props {
  image: string;
  visible: boolean;
  title: string;
  width: number;
  height: number;
  borderRadius: number;
  onApply: (url: string) => void;
  onCancel: () => void;
}

export interface State {
  scale: number;
}

export default class EditImage extends React.Component<Props, State> {
  private editor: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      scale: 1.0,
    };
  }

  handleApplyClick = () => {
    if (this.editor) {
      const canvas = this.editor.getImage().toDataURL();

      fetch(canvas)
        .then((res) => res.blob())
        .then((blob) => window.URL.createObjectURL(blob))
        .then((url) => this.props.onApply(url))
        .catch(() => this.props.onCancel());
    }
    this.props.onCancel();
  };

  setEditorRef = (editor: any) => (this.editor = editor);

  render() {
    const {
      image,
      visible,
      onCancel,
      title,
      width = 512,
      height = 512,
      borderRadius = 250,
    } = this.props;

    const { scale } = this.state;
    if (!visible) return null;

    return (
      <ModalWrapper show={visible} onBackdropClick={onCancel}>
        <div className="modal__header">
          <h4>{title}</h4>
        </div>
        <div className="modal__content">
          <div className="editimage__editor">
            <AvatarEditor
              ref={this.setEditorRef}
              image={image}
              width={width}
              height={height}
              border={4}
              borderRadius={borderRadius}
              scale={scale}
            />
            <Slider
              min={1}
              max={4}
              step={0.2}
              defaultValue={scale}
              onChange={(e) => this.setState({ scale: e })}
            />
          </div>
        </div>
        <div className="modal__actions">
          <Button
            type="button"
            scheme={ButtonSchemeEnum.PRIMARY}
            onClick={this.handleApplyClick}
          >
            Apply
          </Button>
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </ModalWrapper>
    );
  }
}

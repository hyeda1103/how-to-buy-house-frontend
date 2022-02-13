import React from 'react';
import Dropzone, { DropEvent, FileRejection } from 'react-dropzone';

import {
  Container,
} from './styles';

interface Props {
  handleFileDrop: (acceptedFiles: Blob[], fileRejections: FileRejection[], event: DropEvent) => void | undefined
  acceptableExtensions: string
  attachedFileName: string
}

function FileZone({ handleFileDrop, acceptableExtensions, attachedFileName }: Props): JSX.Element {
  return (
    <Container>
      <Dropzone
        accept={acceptableExtensions}
        onDrop={handleFileDrop}
      >
        {({ getRootProps, getInputProps }) => (
          <div>
            <div
              {...getRootProps({
                className: 'dropzone',
                onDrop: (event) => event.stopPropagation(),
              })}
            >
              <input {...getInputProps()} />
              <p>
                {!attachedFileName
                  ? '파일을 드래그 앤 드롭하거나, 클릭하여 파일을 첨부하세요'
                  : attachedFileName}
              </p>
            </div>
          </div>
        )}
      </Dropzone>
    </Container>
  );
}

export default React.memo(FileZone);

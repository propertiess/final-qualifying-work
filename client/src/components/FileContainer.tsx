import { useRef, useState } from 'react';
import { Button, FileInput, Flex } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { observer } from 'mobx-react-lite';

import { getCompaniesStore } from '@/store';

export const FileContainer = observer(() => {
  const companies = getCompaniesStore();
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLButtonElement>(null);

  const onChangeFile = async (f: File | null) => {
    if (!f) {
      return;
    }

    if (!f.name.match(/.xlsx|.xls|.csv/g)) {
      showNotification({
        title: 'Ошибка',
        message: 'Неправильный тип файла!'
      });
      return;
    }

    setFile(f);

    const data = new FormData();
    data.append('file', f);
    companies.setFormData(data);
  };

  return (
    <Flex gap='sm' justify='space-between'>
      <FileInput
        className='flex-grow'
        placeholder='Загрузить dataset'
        withAsterisk
        accept='.xlsx,.xls,.csv'
        value={file}
        ref={fileInputRef}
        onChange={file => onChangeFile(file)}
      />
      {file && (
        <Button
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          Изменить файл
        </Button>
      )}
    </Flex>
  );
});

import { useRef } from 'react';
import { Button, FileInput, Flex } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { observer } from 'mobx-react-lite';

import { useCompaniesStore } from '@/store';
import { routes } from '@/utils/consts';

import { A } from './A';

export const FileContainer = observer(() => {
  const companies = useCompaniesStore();

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

    companies.setFile(f);

    const data = new FormData();
    data.append('file', f);
    companies.setFormData(data);
  };

  return (
    <>
      <Flex gap='sm' justify='space-between'>
        <FileInput
          className='flex-grow'
          placeholder='Загрузить dataset'
          withAsterisk
          accept='.xlsx,.xls,.csv'
          value={companies.file}
          ref={fileInputRef}
          onChange={file => onChangeFile(file)}
        />
        {companies.file && (
          <Button
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            Изменить файл
          </Button>
        )}
      </Flex>
      {companies.file && (
        <A href={`/companies?type=${routes['moving-average']}`}>
          Перейти к прогнозу
        </A>
      )}
    </>
  );
});

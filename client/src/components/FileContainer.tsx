import { useRef } from 'react';
import { Button, FileInput, Flex } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import { getCompaniesStore } from '@/store';
import { routes } from '@/utils/consts';

export const FileContainer = observer(() => {
  const companies = getCompaniesStore();
  const { asPath, push } = useRouter();

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

    const route = asPath.split('/')[1];
    companies.setFile(f);

    const data = new FormData();
    data.append('file', f);
    companies.setFormData(data);

    switch (route) {
      default: {
        push(`/${routes.moving_average}`);
      }
    }
  };

  return (
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
  );
});

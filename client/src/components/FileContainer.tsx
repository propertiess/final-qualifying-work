import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FileInput, Flex } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { observer } from 'mobx-react-lite';

import { getCompaniesStore } from '@/store';

const params = {
  moving_average: 'moving-average',
  linear_regression: 'linear-regression'
};

export const FileContainer = observer(() => {
  const companies = getCompaniesStore();
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

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

    await companies.getPredictByMovingAverage(data);
    await companies.getPredictByLinearRegression(data);
    navigate(`/${params.moving_average}`);

    companies.error &&
      showNotification({
        title: 'Ошибка',
        message: companies.error.message
      });
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

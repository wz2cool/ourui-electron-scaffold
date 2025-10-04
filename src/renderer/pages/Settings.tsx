import React from 'react';
import { Card, Typography, Space, Radio, Divider } from 'antd';
import { SettingOutlined, GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e: any) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
  };

  const getCurrentLanguage = () => {
    return i18n.language || 'zh';
  };

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={2}>
            <SettingOutlined style={{ marginRight: '8px' }} />
            {t('settings.title')}
          </Title>
        </div>

        <Card>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Title level={4}>
                <GlobalOutlined style={{ marginRight: '8px' }} />
                {t('settings.language.title')}
              </Title>
              <Paragraph type="secondary">
                {t('settings.language.description')}
              </Paragraph>
            </div>

            <Divider />

            <div>
              <Paragraph strong>{t('settings.language.current')}</Paragraph>
              <Radio.Group
                value={getCurrentLanguage()}
                onChange={handleLanguageChange}
                style={{ marginTop: '8px' }}
              >
                <Space direction="vertical">
                  <Radio value="zh">{t('settings.language.chinese')}</Radio>
                  <Radio value="en">{t('settings.language.english')}</Radio>
                </Space>
              </Radio.Group>
            </div>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default Settings;
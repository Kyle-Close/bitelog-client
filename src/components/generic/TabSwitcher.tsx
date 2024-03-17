import { styled } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';

interface ITabSwitcherTabs {
  tabName: string;
  tabPanel: React.ReactNode;
}

interface TabSwitcherProps {
  tabs: ITabSwitcherTabs[];
}

export default function TabSwitcher({ tabs }: TabSwitcherProps) {
  const tabList = tabs.map((tab, index) => <Tab value={index}>{tab.tabName}</Tab>);
  const tabPanels = tabs.map((tab, index) => <TabPanel value={index}>{tab.tabPanel}</TabPanel>);

  return (
    <Tabs style={{ backgroundColor: '#1C2025', padding: '1rem' }} defaultValue={0}>
      <TabsList>{tabList}</TabsList>
      {tabPanels}
    </Tabs>
  );
}

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Tab = styled(BaseTab)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  display: flex;
  justify-content: center;
  align-items: center;

  ${theme.breakpoints.up('sm')} {
    padding: 24px 16px;
  }

  &:hover {
    background-color: ${grey[300]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${grey[500]};
  }

  &.${tabClasses.selected} {
    background-color: ${theme.palette.background.paper};
    color: #fff;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
);

const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  background:  'background.paper'; 
  border-radius: 12px;
  opacity: 0.6;
  `
);

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  background-color: ${theme.palette.background.default};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: stretch;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `
);

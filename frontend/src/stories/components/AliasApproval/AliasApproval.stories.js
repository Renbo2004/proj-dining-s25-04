import React from 'react';
import AliasApprovalTable from 'main/components//AliasApproval/AliasApprovalTable';
import { aliasApprovalFixtures } from 'fixtures/aliasApprovalFixtures';

export default {
  title: 'Components/AliasApproval/AliasApprovalTable',
  component: AliasApprovalTable,
};

const Template = (args) => <AliasApprovalTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  aliases: aliasApprovalFixtures.threeUsers,
  onApprove: action('onApprove'),
  onReject: action('onReject'),
};

export const NoAliases = Template.bind({});
NoAliases.args = {
  aliases: [],
  onApprove: action('onApprove'),
  onReject: action('onReject'),
};

export const SingleAlias = Template.bind({});
SingleAlias.args = {
  aliases: [aliasApprovalFixtures.oneAliasApproval],
  onApprove: action('onApprove'),
  onReject: action('onReject'),
};

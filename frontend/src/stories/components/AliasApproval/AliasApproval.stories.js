import React from "react";
import { action } from "@storybook/addon-actions";
import AliasApprovalTable from "main/components/AliasApproval/AliasApprovalTable";
import aliasApprovalFixtures from "fixtures/aliasApprovalFixtures";

export default {
  title: "Components/AliasApproval/AliasApprovalTable",
  component: AliasApprovalTable,
};

const Template = (args) => <AliasApprovalTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  commons: aliasApprovalFixtures.threeUsers,
  onApprove: action("onApprove"),
  onReject: action("onReject"),
};

export const NoAliases = Template.bind({});
NoAliases.args = {
  commons: [],
  onApprove: action("onApprove"),
  onReject: action("onReject"),
};

export const SingleAlias = Template.bind({});
SingleAlias.args = {
  commons: [aliasApprovalFixtures.oneAliasApproval],
  onApprove: action("onApprove"),
  onReject: action("onReject"),
};

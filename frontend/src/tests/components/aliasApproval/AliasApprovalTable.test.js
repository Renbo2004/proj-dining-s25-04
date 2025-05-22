import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AliasApprovalTable from 'main/components/AliasApproval/AliasApprovalTable';
import aliasApprovalFixtures from 'fixtures/aliasApprovalFixtures';

describe('AliasApprovalTable', () => {
  const { threeUsers, oneAliasApproval } = aliasApprovalFixtures;

  test('renders all aliases with Approve and Reject buttons', () => {
    const onApprove = jest.fn();
    const onReject = jest.fn();
    render(
      <AliasApprovalTable
        aliases={threeUsers}
        onApprove={onApprove}
        onReject={onReject}
      />
    );

    threeUsers.forEach((user) => {
      expect(screen.getByText(user.alias)).toBeInTheDocument();
      expect(
        screen.getByTestId(`approve-button-${user.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`reject-button-${user.id}`)
      ).toBeInTheDocument();
    });
  });

  test('calls onApprove with correct alias object when Approve button clicked', async () => {
    const onApprove = jest.fn();
    render(
      <AliasApprovalTable
        aliases={[oneAliasApproval]}
        onApprove={onApprove}
        onReject={jest.fn()}
      />
    );

    await userEvent.click(
      screen.getByTestId(`approve-button-${oneAliasApproval.id}`)
    );
    expect(onApprove).toHaveBeenCalledWith(oneAliasApproval);
  });

  test('calls onReject with correct alias object when Reject button clicked', async () => {
    const onReject = jest.fn();
    render(
      <AliasApprovalTable
        aliases={[oneAliasApproval]}
        onApprove={jest.fn()}
        onReject={onReject}
      />
    );

    await userEvent.click(
      screen.getByTestId(`reject-button-${oneAliasApproval.id}`)
    );
    expect(onReject).toHaveBeenCalledWith(oneAliasApproval);
  });

  test('renders no buttons when aliases list is empty', () => {
    const onApprove = jest.fn();
    const onReject = jest.fn();
    render(
      <AliasApprovalTable aliases={[]} onApprove={onApprove} onReject={onReject} />
    );
    expect(screen.queryByRole('button')).toBeNull();
  });
});

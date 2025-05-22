import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AliasApprovalTable from "main/components/AliasApproval/AliasApprovalTable";

const mockOne = {
  id: 1,
  alias: "Alias1",
  proposedAlias: "Ali1",
  status: "AWAITING_REVIEW",
};

const mockApproved = {
  id: 2,
  alias: "Alias2",
  proposedAlias: "Ali2",
  status: "APPROVED",
};

const mockRejected = {
  id: 3,
  alias: "Alias3",
  proposedAlias: "Ali3",
  status: "REJECTED",
};

describe("AliasApprovalTable", () => {
  it("renders no rows when commons is empty", () => {
    render(
      <AliasApprovalTable
        commons={[]}
        onApprove={jest.fn()}
        onReject={jest.fn()}
      />,
    );
    expect(screen.queryByText("Ali1")).not.toBeInTheDocument();
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("renders rows for each alias", () => {
    render(
      <AliasApprovalTable
        commons={[mockOne, mockApproved, mockRejected]}
        onApprove={jest.fn()}
        onReject={jest.fn()}
      />,
    );
    // check that all proposedAlias texts appear
    expect(screen.getByText("Ali1")).toBeInTheDocument();
    expect(screen.getByText("Ali2")).toBeInTheDocument();
    expect(screen.getByText("Ali3")).toBeInTheDocument();
    // status cell
    expect(screen.getByText("AWAITING_REVIEW")).toBeInTheDocument();
    expect(screen.getByText("APPROVED")).toBeInTheDocument();
    expect(screen.getByText("REJECTED")).toBeInTheDocument();
  });

  it("calls onApprove and onReject callbacks correctly", () => {
    const onApprove = jest.fn();
    const onReject = jest.fn();
    render(
      <AliasApprovalTable
        commons={[mockOne]}
        onApprove={onApprove}
        onReject={onReject}
      />,
    );
    const approveButton = screen.getByTestId("approve-button-1");
    const rejectButton = screen.getByTestId("reject-button-1");

    fireEvent.click(approveButton);
    expect(onApprove).toHaveBeenCalledWith(mockOne);

    fireEvent.click(rejectButton);
    expect(onReject).toHaveBeenCalledWith(mockOne);
  });

  it("disables buttons when status is not AWAITING_REVIEW", () => {
    render(
      <AliasApprovalTable
        commons={[mockApproved, mockRejected]}
        onApprove={jest.fn()}
        onReject={jest.fn()}
      />,
    );
    const approveButton = screen.getByTestId("approve-button-2");
    const rejectButton = screen.getByTestId("reject-button-3");
    expect(approveButton).toBeDisabled();
    expect(rejectButton).toBeDisabled();
  });
});

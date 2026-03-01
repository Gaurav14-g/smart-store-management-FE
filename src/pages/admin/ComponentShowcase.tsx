import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import {
  Badge, Chip, Divider, Accordion, Breadcrumb, Toast, Snackbar,
  ConfirmDialog, SuccessModal, ErrorModal, WarningBanner, InfoTooltip,
  NotificationBell, NotificationPanel, Spinner, FormWrapper, FormSection,
  TextInput, PasswordInput, EmailInput, NumberInput, CurrencyInput,
  Textarea, Select, MultiSelect, RadioGroup, Checkbox, SwitchToggle,
  DatePicker, TimePicker, FileUpload, ImageUploader, RichTextEditor,
  FormErrorMessage, FormSuccessMessage, PaginatedTable, BulkActionBar,
  TableSearchInput, FilterDropdown, RowActionsMenu, Button, Card
} from '../../components';

export default function ComponentShowcase() {
  const [showToast, setShowToast] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
  ];

  const accordionItems = [
    { id: '1', title: 'Section 1', content: 'Content for section 1' },
    { id: '2', title: 'Section 2', content: 'Content for section 2' },
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Showcase' },
  ];

  return (
    <AdminLayout>
      <h1 className="mb-4">Component Showcase</h1>
      
      <Breadcrumb items={breadcrumbItems} />
      
      <Card title="Badges & Chips" className="mb-4">
        <div className="d-flex gap-2 mb-3">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success" pill>Success Pill</Badge>
          <Badge variant="danger">Danger</Badge>
        </div>
        <div className="d-flex gap-2">
          <Chip label="Removable Chip" onRemove={() => alert('Removed')} />
          <Chip label="Info Chip" variant="info" />
        </div>
      </Card>

      <Card title="Notifications" className="mb-4">
        <div className="d-flex gap-2 mb-3">
          <Button onClick={() => setShowToast(true)}>Show Toast</Button>
          <Button onClick={() => setShowSnackbar(true)}>Show Snackbar</Button>
          <Button onClick={() => setShowConfirm(true)}>Show Confirm</Button>
          <Button onClick={() => setShowSuccess(true)}>Show Success</Button>
          <Button onClick={() => setShowError(true)}>Show Error</Button>
        </div>
        <NotificationBell count={5} onClick={() => alert('Notifications')} />
        <InfoTooltip text="This is helpful information" />
      </Card>

      <Card title="Form Components" className="mb-4">
        <FormWrapper onSubmit={(e) => e.preventDefault()}>
          <FormSection title="Basic Inputs">
            <TextInput label="Name" placeholder="Enter your name" />
            <EmailInput label="Email" placeholder="Enter your email" />
            <PasswordInput label="Password" placeholder="Enter password" />
            <NumberInput label="Age" min={0} max={120} />
            <CurrencyInput label="Price" placeholder="0.00" />
          </FormSection>

          <FormSection title="Advanced Inputs">
            <Textarea label="Description" placeholder="Enter description" />
            <Select
              label="Country"
              options={[
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
              ]}
              placeholder="Select country"
            />
            <RadioGroup
              label="Gender"
              name="gender"
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
            />
            <Checkbox label="I agree to terms" />
            <SwitchToggle label="Enable notifications" />
            <DatePicker label="Birth Date" />
            <TimePicker label="Appointment Time" />
          </FormSection>

          <FormErrorMessage message="This is an error message" />
          <FormSuccessMessage message="Form submitted successfully!" />
        </FormWrapper>
      </Card>

      <Card title="Table Components" className="mb-4">
        <div className="d-flex gap-2 mb-3">
          <TableSearchInput placeholder="Search users..." />
          <FilterDropdown
            options={[
              { value: 'all', label: 'All' },
              { value: 'active', label: 'Active' },
            ]}
          />
        </div>
        
        <BulkActionBar
          selectedCount={selectedCount}
          actions={[
            { label: 'Delete', icon: 'trash', variant: 'danger', onClick: () => alert('Delete') },
          ]}
          onClearSelection={() => setSelectedCount(0)}
        />

        <PaginatedTable
          columns={[
            { key: 'id', label: 'ID', sortable: true },
            { key: 'name', label: 'Name', sortable: true },
            { key: 'email', label: 'Email' },
            { key: 'status', label: 'Status' },
          ]}
          data={tableData}
          itemsPerPage={5}
        />
      </Card>

      <Card title="Other Components" className="mb-4">
        <Accordion items={accordionItems} />
        <Divider />
        <Spinner />
        <WarningBanner message="This is a warning message" />
      </Card>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message="This is a toast notification"
        variant="success"
      />

      <Snackbar
        show={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        message="Action completed"
      />

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          alert('Confirmed');
          setShowConfirm(false);
        }}
        message="Are you sure you want to proceed?"
      />

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Operation completed successfully!"
      />

      <ErrorModal
        isOpen={showError}
        onClose={() => setShowError(false)}
        message="An error occurred. Please try again."
      />
    </AdminLayout>
  );
}

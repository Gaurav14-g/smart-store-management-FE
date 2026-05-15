import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import FormWithDrawer from "./FormWithDrawer";
import Button from "./Button";
import TableSearchInput from "./TableSearchInput";
import RowActionsMenu from "./RowActionsMenu";
import ConfirmDialog from "./ConfirmDialog";
import Toast from "./Toast";
import Spinner from "./Spinner";

interface Field {
  key: string;
  label: string;
  type?: string;
  [key: string]: any;
}

interface CrudManagerProps {
  data: {
    api: string;
    createField: any[];
    editField: any[];
    showField: Field[];
  };
  updateFormTitle?: string;
  createFormTitle?: string;
  actionBtnName?: string | false;
  createRequired?: boolean;
  editRequired?: boolean;
  searchRequired?: boolean;
  hideDelete?: boolean;
  onViewImage?: (url: string) => void;
}

const CrudManager: React.FC<CrudManagerProps> = (props) => {
  const dataSchema = props.data;
  const dataApi = dataSchema.api;
  const [apiData, setApiData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDialog, setConfirmDialog] = useState({ show: false, data: null, action: "" });
  const [toastState, setToastState] = useState({ show: false, message: "", variant: "primary" as const });

  const updateFormTitle = props.updateFormTitle || "";
  const createFormTitle = props.createFormTitle || "";
  const actionBtnName = props.actionBtnName !== undefined ? props.actionBtnName : "Create New Data";
  const createRequired = props.createRequired !== false;
  const editRequired = props.editRequired !== false;
  const searchRequired = props.searchRequired !== false;
  const hideDelete = props.hideDelete === true;

  const createField = dataSchema.createField;
  const editField = dataSchema.editField;
  const showField = dataSchema.showField;

  const { Get, Delete, Patch, getAPI } = useApi();
  const navigate = useNavigate();

  const showToast = (message: string, variant: "primary" | "success" | "danger" | "warning" | "info" = "primary") => {
    setToastState({ show: true, message, variant });
  };

  const getData = async () => {
    setSearchQuery("");
    makeApiRequest(dataApi);
  };

  const makeApiRequest = async (api: string) => {
    try {
      const result = await Get(api || dataApi);
      const results = result.results || [];
      setNextPage(result.next);
      setPreviousPage(result.previous);
      setTotalCount(result.count || 0);
      setApiData(results);
      setFilteredData(results);
    } catch (err: any) {
      if (err.code === "ERR_BAD_REQUEST") {
        showToast("Unauthorised access to page, Contact admin for access.", "danger");
        navigate("/");
      } else {
        showToast(err.message, "danger");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInputChange = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (query: string) => {
        setSearchQuery(query);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const url = query ? `${getAPI(dataApi)}?search=${query}` : dataApi;
          makeApiRequest(url);
        }, 300);
      };
    })(),
    [dataApi]
  );

  const handleSort = (columnKey: string) => {
    const isAsc = orderBy === columnKey && order === "asc";
    setOrderBy(columnKey);
    setOrder(isAsc ? "desc" : "asc");
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (!orderBy) return 0;
    const aVal = a[orderBy];
    const bVal = b[orderBy];
    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });

  const softDelete = async (data: any) => {
    try {
      await Patch(dataApi, data.id, { is_active: false });
      showToast("User deactivated successfully!", "success");
      getData();
    } catch {
      showToast("Something went wrong", "danger");
      getData();
    }
  };

  const restore = async (data: any) => {
    try {
      await Patch(dataApi, data.id, { is_active: true });
      showToast("User activated successfully!", "success");
      getData();
    } catch {
      showToast("Something went wrong", "danger");
      getData();
    }
  };

  const forceDelete = async (data: any) => {
    try {
      await Delete(dataApi, data.id);
      showToast("Record deleted successfully!", "success");
      getData();
    } catch {
      showToast("Unable to delete record", "danger");
      getData();
    }
  };

  const handleConfirmAction = () => {
    if (confirmDialog.action === "softDelete") {
      softDelete(confirmDialog.data);
    } else if (confirmDialog.action === "restore") {
      restore(confirmDialog.data);
    } else if (confirmDialog.action === "forceDelete") {
      forceDelete(confirmDialog.data);
    }
    setConfirmDialog({ show: false, data: null, action: "" });
  };

  const pageChangeRequest = (direction: "next" | "prev") => {
    const url = direction === "next" ? nextPage : previousPage;
    if (url) {
      makeApiRequest(url);
      setCurrentPage(direction === "next" ? currentPage + 1 : currentPage - 1);
    }
  };

  useEffect(() => {
    if (loading) {
      getData();
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <Spinner fullScreen />
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3 px-1">
            <div>
              {createRequired && actionBtnName !== false && (
                <FormWithDrawer
                  actionBtnName={actionBtnName as string}
                  inputFields={createField}
                  api={dataApi}
                  createFormTitle={createFormTitle}
                  refreshData={getData}
                  buttonVariant="primary"
                />
              )}
            </div>
            {searchRequired && (
              <div style={{ width: "280px" }}>
                <TableSearchInput
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  placeholder="Search..."
                />
              </div>
            )}
          </div>

          <div className="table-responsive rounded border">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.875rem' }}>
              <thead style={{ backgroundColor: '#1e293b', color: '#f1f5f9', position: 'sticky', top: 0, zIndex: 10 }}>
                <tr>
                  {showField.map((th, index) => (
                    <th
                      key={index}
                      onClick={() => th.type !== 'rowIndex' && handleSort(th.key)}
                      style={{ cursor: th.type === 'rowIndex' ? 'default' : 'pointer', whiteSpace: 'nowrap', padding: '13px 16px', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.04em', textTransform: 'uppercase', borderBottom: 'none' }}
                    >
                      {th.label}{' '}
                      {th.type !== 'rowIndex' && (orderBy === th.key ? (
                        <span style={{ opacity: 1 }}>{order === 'asc' ? '▲' : '▼'}</span>
                      ) : (
                        <span style={{ opacity: 0.3 }}>▲</span>
                      ))}
                    </th>
                  ))}
                  {actionBtnName !== false && (
                    <th className="text-center" style={{ width: '130px', padding: '13px 16px', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.04em', textTransform: 'uppercase', borderBottom: 'none' }}>
                      {!hideDelete ? 'Actions' : ''}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {sortedData.length === 0 ? (
                  <tr>
                    <td colSpan={showField.length + 1} className="text-center text-muted py-5">
                      <i className="bi bi-inbox fs-3 d-block mb-2"></i>
                      No records found
                    </td>
                  </tr>
                ) : sortedData.map((data, rowIndex) => (
                  <tr
                    key={rowIndex}
                    style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: !data.is_active ? '#f8fafc' : 'white' }}
                  >
                    {showField.map((field, i) => (
                      <td key={i} style={{ padding: '12px 16px', verticalAlign: 'middle', color: !data.is_active ? '#131414' : '#111827', fontWeight: 500 }}>
                        {field.type === 'rowIndex' ? (
                          <span className="text-muted">{rowIndex + 1}</span>
                        ) : field.type === 'status' ? (
                          <span className={`badge rounded-pill bg-${data[field.key] === true || data[field.key] === 'Success' ? 'success' : 'danger'}`}>
                            {String(data[field.key])}
                          </span>
                        ) : field.type === 'image' ? (
                          <Button variant="primary" size="sm" onClick={() => props.onViewImage && props.onViewImage(data[field.key])}>
                            View
                          </Button>
                        ) : field.key === 'groups_detail' && Array.isArray(data[field.key]) ? (
                          data[field.key].map((group: any, idx: number) => (
                            <span key={idx} className="badge bg-secondary me-1">{group.name}</span>
                          ))
                        ) : field.key === 'permissions_detail' && Array.isArray(data[field.key]) ? (
                          data[field.key].map((perm: any, idx: number) => (
                            <span key={idx} className="badge bg-info me-1" style={{ fontSize: '0.7rem' }}>{perm.name}</span>
                          ))
                        ) : field.key === 'quantity' || field.label === 'Stock' ? (
                          <span className={`badge rounded-pill ${
                            Number(data[field.key]) <= 10 ? 'bg-danger' :
                            Number(data[field.key]) <= 50 ? 'bg-warning text-dark' : 'bg-success'
                          }`} style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
                            {data[field.key]}
                          </span>
                        ) : field.key === 'price' ? (
                          <span className="fw-semibold" style={{ color: '#0f766e' }}>₹{Number(data[field.key]).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        ) : typeof data[field.key] === 'boolean' ? (
                          data[field.key] ? 'true' : 'false'
                        ) : (
                          data[field.key]
                        )}
                      </td>
                    ))}
                    {actionBtnName !== false && (
                      <td className="text-center" style={{ padding: '10px 16px' }}>
                        <div className="d-flex gap-2 justify-content-center">
                          {editRequired && (
                            <FormWithDrawer
                              actionBtnName="Edit"
                              inputFields={editField}
                              data={data}
                              api={dataApi}
                              refreshData={getData}
                              buttonVariant="secondary"
                              updateFormTitle={updateFormTitle}
                              submitBtnTitle="Update Data"
                            />
                          )}
                          {!hideDelete && (
                            <RowActionsMenu
                              actions={[
                                {
                                  label: data.is_active ? 'Deactivate User' : 'Activate User',
                                  icon: data.is_active ? 'x-circle' : 'check-circle',
                                  onClick: () => setConfirmDialog({ show: true, data, action: data.is_active ? 'softDelete' : 'restore' }),
                                },
                                {
                                  label: 'Remove Record',
                                  icon: 'trash',
                                  variant: 'danger',
                                  onClick: () => setConfirmDialog({ show: true, data, action: 'forceDelete' }),
                                },
                              ]}
                            />
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 px-1">
            <span className="text-muted" style={{ fontSize: '0.85rem' }}>
              Showing <strong>{filteredData.length}</strong> of <strong>{totalCount}</strong> records
            </span>
            <div className="d-flex align-items-center gap-2">
              <Button variant="light" className="border" size="sm" onClick={() => pageChangeRequest('prev')} disabled={!previousPage}>
                ← Previous
              </Button>
              <span className="px-3 py-1 rounded border bg-white" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                Page {currentPage}
              </span>
              <Button variant="light" className="border" size="sm" onClick={() => pageChangeRequest('next')} disabled={!nextPage}>
                Next →
              </Button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmDialog.show}
        onClose={() => setConfirmDialog({ show: false, data: null, action: "" })}
        onConfirm={handleConfirmAction}
        title="Confirm Action"
        message={
          confirmDialog.action === "forceDelete"
            ? "Data will be removed permanently! Are you sure?"
            : confirmDialog.action === "softDelete"
            ? "Are you sure you want to deactivate this user?"
            : "Are you sure you want to activate this user?"
        }
        confirmText={confirmDialog.action === "forceDelete" ? "Yes, delete it!" : "Confirm"}
      />

      <Toast
        show={toastState.show}
        onClose={() => setToastState({ ...toastState, show: false })}
        message={toastState.message}
        variant={toastState.variant}
      />
    </>
  );
};

export default CrudManager;

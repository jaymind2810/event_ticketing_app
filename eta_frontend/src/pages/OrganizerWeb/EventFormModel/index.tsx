import { useState, useEffect } from "react";

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any; // for edit
}

interface TicketType {
  name: string;
  price: number;
  total_quantity: number;
  available_quantity: number;
}

export default function EventFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: EventFormModalProps) {
  const [formData, setFormData] = useState<any>(
    initialData || {
      title: "",
      description: "",
      location: "",
      event_date: "",
      status: "DRAFT",
      ticket_types: [],
    }
  );

  const handleTicketChange = (index: number, field: keyof TicketType, value: any) => {
    const updatedTickets = [...formData.ticket_types];
    updatedTickets[index] = {
      ...updatedTickets[index],
      [field]: value,
      ...(field === "total_quantity"
        ? { available_quantity: value } // auto set available_quantity
        : {}),
    };
    setFormData({ ...formData, ticket_types: updatedTickets });
  };

  const addTicketType = () => {
    setFormData({
      ...formData,
      ticket_types: [
        ...formData.ticket_types,
        { name: "", price: 0, total_quantity: 0, available_quantity: 0 },
      ],
    });
  };

  const removeTicketType = (index: number) => {
    const updatedTickets = [...formData.ticket_types];
    updatedTickets.splice(index, 1);
    setFormData({ ...formData, ticket_types: updatedTickets });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Event" : "Create Event"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Fields */}
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="datetime-local"
            value={formData.event_date}
            onChange={(e) =>
              setFormData({ ...formData, event_date: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <div>
            <label className="block mb-1 font-semibold">Status</label>
            <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
            >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="CANCELLED">Cancelled</option>
            </select>
        </div>

          {/* Ticket Types Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Ticket Types</h3>
            {formData.ticket_types.map((ticket: TicketType, index: number) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-2 mb-2 items-center"
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={ticket.name}
                  onChange={(e) =>
                    handleTicketChange(index, "name", e.target.value)
                  }
                  className="border rounded-lg px-2 py-1"
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={ticket.price}
                  onChange={(e) =>
                    handleTicketChange(index, "price", parseFloat(e.target.value))
                  }
                  className="border rounded-lg px-2 py-1"
                />

                <input
                  type="number"
                  placeholder="Total Quantity"
                  value={ticket.total_quantity}
                  onChange={(e) =>
                    handleTicketChange(
                      index,
                      "total_quantity",
                      parseInt(e.target.value)
                    )
                  }
                  className="border rounded-lg px-2 py-1"
                />

                <button
                  type="button"
                  onClick={() => removeTicketType(index)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addTicketType}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              + Add Ticket
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

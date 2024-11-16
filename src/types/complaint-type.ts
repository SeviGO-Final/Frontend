export type ComplaintType = {
    title: string;
    content: string;
    date_event: string;
    location: string;
    category: string;
    evidence: File | null;
    current_status?: string;
    user?: string;
}

export type TrackingStatusResponse = {
    _id: string;
    status: string;
    notes: string;
    updated_at?: string;
}

export type ComplaintResponse = {
    _id: string;
    title: string;
    category: {_id: string, name: string};
    content: string;
    date_event: string;
    location: string;
    evidence: string;
    current_status: string;
    tracking_status?: TrackingStatusResponse[];
    is_deleted: boolean;
    created_at?: string,
    updated_at?: string
}
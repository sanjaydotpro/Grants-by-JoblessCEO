"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Save, X, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { FileUpload } from "@/components/ui/file-upload";

interface Institution {
  id: string;
  name: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

interface Grant {
  id: string;
  name: string;
  institutionId: string;
  institutionName?: string;
  grantAmount?: number;
  website?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}



export default function AdminPage() {
  const { toast } = useToast();
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [grants, setGrants] = useState<Grant[]>([]);

  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<string>("");

  // Form states
  const [institutionForm, setInstitutionForm] = useState({ name: "", website: "" });
  const [grantForm, setGrantForm] = useState({
    name: "",
    institutionId: "",
    grantAmount: "",
    website: "",
    description: ""
  });


  // Fetch data functions
  const fetchInstitutions = async () => {
    try {
      const response = await fetch("/api/v1/admin/institutions");
      if (response.ok) {
        const data = await response.json();
        setInstitutions(data);
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch institutions", variant: "destructive" });
    }
  };

  const fetchGrants = async () => {
    try {
      const response = await fetch("/api/v1/admin/grants");
      if (response.ok) {
        const data = await response.json();
        setGrants(data);
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch grants", variant: "destructive" });
    }
  };



  useEffect(() => {
    fetchInstitutions();
    fetchGrants();

  }, []);

  // CRUD operations for institutions
  const handleInstitutionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = editingType === "institution" ? "PUT" : "POST";
      const body = editingType === "institution" 
        ? { ...institutionForm, id: editingItem.id }
        : institutionForm;

      const response = await fetch("/api/v1/admin/institutions", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        toast({ title: "Success", description: `Institution ${editingType === "institution" ? "updated" : "created"} successfully` });
        setInstitutionForm({ name: "", website: "" });
        setEditingItem(null);
        setEditingType("");
        fetchInstitutions();
        fetchGrants(); // Refresh grants to update institution names
      } else {
        throw new Error("Failed to save institution");
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to save institution", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // CRUD operations for grants
  const handleGrantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = editingType === "grant" ? "PUT" : "POST";
      const body = editingType === "grant" 
        ? { ...grantForm, id: editingItem.id }
        : grantForm;

      const response = await fetch("/api/v1/admin/grants", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        toast({ title: "Success", description: `Grant ${editingType === "grant" ? "updated" : "created"} successfully` });
        setGrantForm({ name: "", institutionId: "", grantAmount: "", website: "", description: "" });
        setEditingItem(null);
        setEditingType("");
        fetchGrants();
      } else {
        throw new Error("Failed to save grant");
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to save grant", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };



  // Delete functions
  const handleDelete = async (type: string, id: string) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      const response = await fetch(`/api/v1/admin/${type}s?id=${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        toast({ title: "Success", description: `${type} deleted successfully` });
        if (type === "institution") {
          fetchInstitutions();
          fetchGrants(); // Refresh grants as well
        } else if (type === "grant") {
          fetchGrants();

        }
      } else {
        throw new Error(`Failed to delete ${type}`);
      }
    } catch (error) {
      toast({ title: "Error", description: `Failed to delete ${type}`, variant: "destructive" });
    }
  };

  // Edit functions
  const handleEdit = (type: string, item: any) => {
    setEditingType(type);
    setEditingItem(item);
    
    if (type === "institution") {
      setInstitutionForm({ name: item.name, website: item.website || "" });
    } else if (type === "grant") {
      setGrantForm({
        name: item.name,
        institutionId: item.institutionId,
        grantAmount: item.grantAmount?.toString() || "",
        website: item.website || "",
        description: item.description || ""
      });

    }
  };

  const cancelEdit = () => {
    setEditingType("");
    setEditingItem(null);
    setInstitutionForm({ name: "", website: "" });
    setGrantForm({ name: "", institutionId: "", grantAmount: "", website: "", description: "" });
  };

  // File upload handler
  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/v1/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: `File uploaded successfully! ${result.summary}`,
        });
        // Refresh data
        fetchInstitutions();
        fetchGrants();
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to upload file',
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Portal</h1>
        <Badge variant="outline">Manage Grants & Content</Badge>
      </div>

      <Tabs defaultValue="institutions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="institutions">Institutions</TabsTrigger>
          <TabsTrigger value="grants">Grants</TabsTrigger>
          <TabsTrigger value="upload">Upload Data</TabsTrigger>
        </TabsList>

        {/* Institutions Tab */}
        <TabsContent value="institutions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {editingType === "institution" ? "Edit Institution" : "Add New Institution"}
              </CardTitle>
              <CardDescription>
                {editingType === "institution" ? "Update institution details" : "Create a new institution that can offer grants"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInstitutionSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="inst-name">Institution Name *</Label>
                    <Input
                      id="inst-name"
                      value={institutionForm.name}
                      onChange={(e) => setInstitutionForm({ ...institutionForm, name: e.target.value })}
                      placeholder="Enter institution name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="inst-website">Website</Label>
                    <Input
                      id="inst-website"
                      value={institutionForm.website}
                      onChange={(e) => setInstitutionForm({ ...institutionForm, website: e.target.value })}
                      placeholder="https://example.com"
                      type="url"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    {editingType === "institution" ? "Update" : "Create"} Institution
                  </Button>
                  {editingType === "institution" && (
                    <Button type="button" variant="outline" onClick={cancelEdit}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Existing Institutions ({institutions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {institutions.map((institution) => (
                    <TableRow key={institution.id}>
                      <TableCell className="font-medium">{institution.name}</TableCell>
                      <TableCell>
                        {institution.website ? (
                          <a href={institution.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {institution.website}
                          </a>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>{new Date(institution.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit("institution", institution)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete("institution", institution.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Grants Tab */}
        <TabsContent value="grants" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {editingType === "grant" ? "Edit Grant" : "Add New Grant"}
              </CardTitle>
              <CardDescription>
                {editingType === "grant" ? "Update grant details" : "Create a new grant opportunity"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGrantSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="grant-name">Grant Name *</Label>
                    <Input
                      id="grant-name"
                      value={grantForm.name}
                      onChange={(e) => setGrantForm({ ...grantForm, name: e.target.value })}
                      placeholder="Enter grant name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="grant-institution">Institution *</Label>
                    <Select
                      value={grantForm.institutionId}
                      onValueChange={(value) => setGrantForm({ ...grantForm, institutionId: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select institution" />
                      </SelectTrigger>
                      <SelectContent>
                        {institutions.map((institution) => (
                          <SelectItem key={institution.id} value={institution.id}>
                            {institution.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="grant-amount">Grant Amount ($)</Label>
                    <Input
                      id="grant-amount"
                      value={grantForm.grantAmount}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGrantForm({ ...grantForm, grantAmount: e.target.value })}
                      placeholder="50000"
                      type="number"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="grant-website">Website</Label>
                    <Input
                      id="grant-website"
                      value={grantForm.website}
                      onChange={(e) => setGrantForm({ ...grantForm, website: e.target.value })}
                      placeholder="https://example.com/grant"
                      type="url"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="grant-description">Description</Label>
                  <textarea
                    id="grant-description"
                    value={grantForm.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setGrantForm({ ...grantForm, description: e.target.value })}
                    placeholder="Describe the grant opportunity, eligibility criteria, and application process..."
                    rows={4}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    {editingType === "grant" ? "Update" : "Create"} Grant
                  </Button>
                  {editingType === "grant" && (
                    <Button type="button" variant="outline" onClick={cancelEdit}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Existing Grants ({grants.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Grant Name</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grants.map((grant) => (
                    <TableRow key={grant.id}>
                      <TableCell className="font-medium">{grant.name}</TableCell>
                      <TableCell>{grant.institutionName || "—"}</TableCell>
                      <TableCell>
                        {grant.grantAmount ? `$${grant.grantAmount.toLocaleString()}` : "—"}
                      </TableCell>
                      <TableCell>
                        {grant.website ? (
                          <a href={grant.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Link
                          </a>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit("grant", grant)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete("grant", grant.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Data Files
              </CardTitle>
              <CardDescription>
                Upload Excel (.xlsx) or CSV files containing institutions, grants, or news data. 
                The system will automatically parse and import the data into the database.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                  onFileUpload={handleFileUpload}
                  acceptedFileTypes={[".xlsx", ".xls", ".csv"]}
                  maxFileSize={10 * 1024 * 1024} // 10MB
                  uploadType="grants"
                />
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">File Format Guidelines</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Institutions</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-1">
                      <p><strong>Required columns:</strong></p>
                      <p>• name</p>
                      <p><strong>Optional columns:</strong></p>
                      <p>• website</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Grants</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-1">
                      <p><strong>Required columns:</strong></p>
                      <p>• name</p>
                      <p>• institutionName</p>
                      <p><strong>Optional columns:</strong></p>
                      <p>• grantAmount, website, description</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">News</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-1">
                      <p><strong>Required columns:</strong></p>
                      <p>• title</p>
                      <p>• content</p>
                      <p><strong>Optional columns:</strong></p>
                      <p>• author, publishedAt</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
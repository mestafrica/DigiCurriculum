import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Key,
  Plus,
  Trash2,
  RefreshCw,
  Copy,
  Check,
  AlertTriangle,
} from "lucide-react";

const generateApiKey = () =>
  `pk_${Math.random().toString(36).substr(2, 9)}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

const APIKeysManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [showCreateSuccess, setShowCreateSuccess] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedKeyId, setSelectedKeyId] = useState(null);
  const [keys, setKeys] = useState([
    {
      id: 1,
      name: "Production API Key",
      key: "pk_live_51NcgDkH32",
      created: "2024-03-15 09:23:45",
      lastUsed: "2 minutes ago",
      status: "active",
      environment: "production",
      requests: "10",
    },
    {
      id: 2,
      name: "Development API Key",
      key: "pk_test_51NcgDkH32",
      created: "2024-03-10 14:30:00",
      lastUsed: "5 hours ago",
      status: "active",
      environment: "development",
      requests: "25",
    },
  ]);

  const [showKey, setShowKey] = useState({});
  const [copiedKey, setCopiedKey] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const simulateApiCall = (callback) => {
    setIsLoading(true);
    setTimeout(() => {
      callback();
      setIsLoading(false);
    }, 800);
  };

  const handleCopyKey = async (key) => {
    await navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;

    simulateApiCall(() => {
      const newKey = {
        id: keys.length + 1,
        name: newKeyName,
        key: generateApiKey(),
        created: new Date().toLocaleString(),
        lastUsed: "Never",
        status: "active",
        environment: "development",
        requests: "0",
      };
      setKeys([...keys, newKey]);
      setNewKeyName("");
      setIsDialogOpen(false);
      setShowCreateSuccess(true);
      setTimeout(() => setShowCreateSuccess(false), 3000);
    });
  };

  const handleRegenerateKey = (id) => {
    simulateApiCall(() => {
      setKeys(
        keys.map((key) =>
          key.id === id
            ? {
                ...key,
                key: generateApiKey(),
                created: new Date().toLocaleString(),
              }
            : key
        )
      );
    });
  };

  const handleDeleteKey = (id) => {
    simulateApiCall(() => {
      setKeys(keys.filter((key) => key.id !== id));
      setShowDeleteDialog(false);
    });
  };

  return (
    <div className="space-y-6">
      {showCreateSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-500" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            New API key has been created successfully.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">API Keys</CardTitle>
          <CardDescription>
            Securely manage API keys for your application's authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Generate New API Key
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New API Key</DialogTitle>
                  <DialogDescription>
                    This key will have full access to your API. Keep it secure.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Key Name</Label>
                    <Input
                      id="name"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="e.g., Production API Key"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateKey}
                    disabled={isLoading || !newKeyName.trim()}
                  >
                    {isLoading ? "Generating..." : "Generate Key"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Requests</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {showKey[item.id] ? item.key : "•".repeat(24)}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setShowKey({
                            ...showKey,
                            [item.id]: !showKey[item.id],
                          })
                        }
                      >
                        <Key className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyKey(item.key)}
                      >
                        {copiedKey === item.key ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.environment === "production"
                          ? "destructive"
                          : "default"
                      }
                    >
                      {item.environment}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.created}</TableCell>
                  <TableCell>{item.lastUsed}</TableCell>
                  <TableCell>{item.requests}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "active" ? "default" : "secondary"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRegenerateKey(item.id)}
                        disabled={isLoading}
                      >
                        <RefreshCw
                          className={`h-4 w-4 ${
                            isLoading ? "animate-spin" : ""
                          }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedKeyId(item.id);
                          setShowDeleteDialog(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex items-center text-yellow-600">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <p className="text-sm">
              Never share your API keys in public repositories or client-side
              code
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Total Active Keys: {keys.length}
          </p>
        </CardFooter>
      </Card>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete API Key</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              API key and revoke all access.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDeleteKey(selectedKeyId)}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete Key"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default APIKeysManagement;